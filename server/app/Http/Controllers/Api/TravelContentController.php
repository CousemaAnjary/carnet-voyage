<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TravelContentController extends Controller
{
    public function upload(Request $request) {

        $rules = [
            'travel_id' => 'required|exists:travels,id',
            'img.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
        ];
    
        try {
            $validatedData = $request->validate($rules);

            $user_id = Auth::id();
            $travel_id = $validatedData["travel_id"];

            $images = $request->file('img');

            if (!$images || count($images) === 0) {
                return response()->json(['error' => 'No images found in the request'], 422);
            }
            
            foreach ($images as $image) {
                $path = $image->store("users/{$user_id}/travel_{$travel_id}", 'public');
            }

            return response()->json(['message' => 'Contents saved successfully'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['error' => 'File upload failed: ' . $e->getMessage()], 500);
        }
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
