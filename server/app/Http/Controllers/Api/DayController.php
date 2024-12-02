<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DayPhoto;
use App\Models\Day;
use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DayController extends Controller
{
    public function postDay(Request $request) {
        $uid = Auth::user()->id;

        $rules = [
            'travel_id' => [
                'required',
                'exists:travels,id',
                function ($attribute, $value, $fail) use ($uid) {
                    $travel = Travel::find($value);
                    if ($travel && !is_null($travel->ended_at)) {
                        $fail('The selected travel has already ended.');
                    }
                    if($travel && $travel->user_id != $uid) {
                        $fail('Unauthorized operation');
                    }
                },
            ],
            'legend' => 'string|max:255',
            'location' => 'string|max:255',
            'img.*' => 'required|image|mimes:jpeg,jpg,png'
        ];

        $request_data = Validator::make($request->all(), $rules)->validate();

        $images = $request->file('img');
        if (!$images || count($images) === 0) {
            abort(422,'No images found in the request');
        }

        $created_day = \DB::transaction(function() use ($request_data, $images, $uid) {
            $day = Day::create([
                'travel_id' => $request_data['travel_id'],
                'location' => $request_data['location'] ?? null,
                'legend' => $request_data['legend']
            ]);

            $day_photos = [];
            foreach ($images as $image) {
                $path = $image->store("users/{$uid}/travel_{$request_data["travel_id"]}", 'public');
                $day_photos [] = [
                    'day_id' => $day->id,
                    'photo_url' => asset("storage/{$path}")
                ];
            }
            $day_photos = DayPhoto::insert($day_photos);

            return [...$day->toArray(), "day_photos" => $day_photos];
        });
    
        return response()->json(['day' => $created_day]);
    }

    public function edit(Request $request, string $id) {
        $validatedData = $request->validate([
            'legend' => 'required|string|max:255',
        ]);

        $content = Day::findOrFail($id);

        // verifie if travel is belong to user
        $travel = Travel::find($content->travel_id)
                    ->where('user_id', Auth::user()->id)->exists();
        if(!$travel) {
            abort(401,"Unauthorized operation");
        }

        $content->upadate([
            "description" => $validatedData['description']
        ]);

        return response()->json(["message" => "description saved successfully"]);
    }
}
