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
        $user_id = Auth::id();

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
            'img.*' => 'required|image|mimes:jpeg,jpg'
        ];
    
        try {
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
                    'taken_at' => $this->getImageTakenDate($image),
                ];
            }

            TravelContent::insert($contents);

            return response()->json(['message' => 'Contents saved successfully'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['error' => 'File upload failed: ' . $e->getMessage()], 500);
        }
    }

    private function getImageTakenDate($image) {
        $exif = @exif_read_data($image->getPathname());
        if ($exif && isset($exif['DateTimeOriginal'])) {
            return $exif['DateTimeOriginal'];
        }
        return null;
    }

    public function getTravelContent(string $travel_id) {
        $user_id = Auth::id();

        $travel = Travel::where('travel_id', $travel_id)->where('user_id', $user_id)->first();

        if(!$travel) {
            return response()->json(["message" => "Unauthorized operation'"], 401);
        }

        $travel_contents = TravelContent::where('travel_id', $travel_id)->get();

        return $travel_contents;
    }

    public function delete(string $id) {
        $user_id = Auth::id();

        $content = TravelContent::find($id);

        if(!$content) {
            return response()->json(["message" => "Content not found"], 404);
        }

        $travel = Travel::where('id', $content->travel_id)->where('user_id', $user_id)->first();

        if(!$travel) {
            return response()->json(["message" => "Unauthorized operation'"], 401);
        }

        $content->delete();

        return response()->json(["message" => "Content deleted successfully"], 200);
    }

    public function edit(Request $request, string $id) {
        try {
            $validatedData = $request->validate([
                'description' => 'required|string|max:255',
            ]);
    
            $content = TravelContent::find($id);
    
            if(!$content) {
                return response()->json(["message" => "Content not found"], 404);
            }
    
            $user_id = Auth::id();
            $travel = Travel::where('id', $content->travel_id)->where('user_id', $user_id)->first();
    
            if(!$travel) {
                return response()->json(["message" => "Unauthorized operation'"], 401);
            }
    
            $content->description = $validatedData['description'];

            $content->save();

            return response()->json(["message" => "description saved successfully"], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
}
