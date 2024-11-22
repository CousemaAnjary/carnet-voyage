<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use App\Models\TravelContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TravelContentController extends Controller
{
    public function upload(Request $request) {
        $user_id = Auth::user()->id;

        $rules = [
            'travel_id' => [
                'required',
                'exists:travels,id',
                function ($attribute, $value, $fail) use ($user_id) {
                    $travel = Travel::find($value);
                    if ($travel && !is_null($travel->ended_at)) {
                        $fail('The selected travel has already ended.');
                    }
                    if($travel && $travel->user_id != $user_id) {
                        $fail('Unauthorized operation');
                    }
                },
            ],
            'img.*' => 'required|image|mimes:jpeg,jpg,png'
        ];

        $validatedData = Validator::make($request->all(), $rules)->validate();

        $images = $request->file('img');
        if (!$images || count($images) === 0) {
            return response()->json(['error' => 'No images found in the request'], 422);
        }
        
        $contents = [];
        $travel_id = $validatedData["travel_id"];
        foreach ($images as $image) {
            $path = $image->store("users/{$user_id}/travel_{$travel_id}", 'public');
            $contents [] = [
                'travel_id' => $travel_id,
                'img_url' => asset("storage/{$path}"),
                'taken_at' => $this->getImageTakenDate($image) ?? now(),
            ];
        }

        TravelContent::insert($contents); // save

        return response()->json(['message' => 'Contents saved successfully']);
    }

    private function getImageTakenDate($image) {
        $exif = @exif_read_data($image->getPathname());
        if ($exif && isset($exif['DateTimeOriginal'])) {
            return $exif['DateTimeOriginal'];
        }
        return null;
    }

    public function getTravelContents(string $id) {
        $travel = Travel::find($id)
                    ->where('user_id', Auth::user()->id)->exists();
        if(!$travel) {
            abort(401, 'Unauthorized operation');
        }

        $travel_contents = TravelContent::where('travel_id', $id)
                            ->get();

        return [
            'contents' => $travel_contents
        ];
    }

    public function delete(string $id) {
        //
        $content = TravelContent::find($id)->travel()
                    ->where('user_id', Auth::user()->id)->first();
                    
        if(!$content) {
            abort(401,"Unauthorized operation");
        }

        $content->delete();

        return response()->json(["message" => "Content deleted successfully"]);
    }

    public function edit(Request $request, string $id) {
        $validatedData = $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $content = TravelContent::findOrFail($id);

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
