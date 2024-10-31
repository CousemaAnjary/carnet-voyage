<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TravelContentController extends Controller
{
    public function upload(Request $request) {

        $rules = [
            'travel_id' => 'required|exists:travels,id',
            'img.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
        ];
    
        try {
            $validatedData = $request->validate($rules);

            $images = $request->file('img');
            foreach ($images as $image) {
                // Sauvegarder le fichier
                $path = $image->store('uploads', 'public');
            }
    
            return response()->json(['message' => 'Contents uploaded successfully'], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
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
