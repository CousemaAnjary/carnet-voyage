<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TravelController extends Controller
{
    public function create(Request $request) {
        $user_id = Auth::user()->id;

        // verifie if user have in progress travel
        $userHaveInProgessJourney = Travel::where('user_id', $user_id)
                                        ->whereNull('ended_at')->exists();
        if($userHaveInProgessJourney) {
            abort(401,'User already have a travel in progress');
        }

        // validation rules
        $rules = [
            'name' => 'required|string',
            'beginning_at' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'ended_at' => 'nullable|date|date_format:Y-m-d|after:beginning_at',
        ];
        if(!$request->input('country')) {
            $rules['city'] = 'required|string';
        } else {
            $rules['country'] = 'required|string';
            $rules['city'] = 'nullable|string';
        }

        // rules validation
        $validatedData = $request->validate($rules); 
        // assing user to travel to created
        $validatedData['user_id'] = $user_id;

        $created_travel = Travel::create($validatedData);
                            
        return response()->json(['travel' => $created_travel]);
    }

    public function get() {
        $travels =  Travel::where('user_id', Auth::user()->id)
                        ->with(['days.dayPhotos'])
                        ->get()
                        ->makeHidden(['user_id']);

        return [
            'travels' => $travels
        ];
    }

    public function close(string $id) {
        $travel = Travel::where('id', $id)
                    ->where('user_id', Auth::user()->id)
                    ->whereNull('ended_at')->first();

        if (!$travel) {
            abort(404,'Travel not found or already closed');
        }

        // do closing
        $ending_date = Carbon::now()->format('Y-m-d');
        $travel->ended_at = $ending_date;
        $travel->save();
            
        return response()->json([
            'id' => $travel->id,
            'date' => $ending_date
        ]);
    }

    public function cancel(string $id) {
        $travel = Travel::where('id', $id)
                    ->where('user_id', Auth::user()->id)
                    ->whereNull('ended_at')->first();

        if (!$travel) {
            abort(404,'Travel not found');
        }

        $travel->delete(); // delete
            
        return response()->json(['message' => 'Travel canceled successfully']);
    }

    public function rename(Request $request, string $id) {
        $rule = [
            'new_name' => 'required|string',
        ];

        $validatedData = $request->validate($rule);

        $travel = Travel::find($id)
                    ->where('user_id', Auth::user()->id)->first();
        if (!$travel) {
            abort(404,'Travel not found');
        }
        
        // rename
        $travel->name = $validatedData['new_name'];
        $travel->save();

        return response()->json(['message' => 'Travel renamed successfully']);
    }
}