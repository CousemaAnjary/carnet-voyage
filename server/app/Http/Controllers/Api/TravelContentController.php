<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TravelContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TravelContentController extends Controller
{
    public function upload(Request $request) {
        $rules = [
            'travel_id' => [
                'required',
                'exists:travels,id',
                function ($attribute, $value, $fail) {
                    $travel = \App\Models\Travel::find($value);
                    if ($travel && !is_null($travel->ended_at)) {
                        $fail('The selected travel has already ended.');
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
            $user_id = Auth::id();
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

    public function getContents(string $travel_id) {

    }

    public function get(string $id) {

    }

    public function delete(string $id) {

    }

    public function write(string $id) {

    }
    
}
