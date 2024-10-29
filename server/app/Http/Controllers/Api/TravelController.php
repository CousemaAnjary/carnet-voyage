<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TravelController extends Controller
{
    public function create(Request $request) {

        $rules = [
            'beginning_at' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'ended_at' => 'nullable|date|date_format:Y-m-d|after:beginning_at',
        ];

        if(!$request->input('country')) {
            $rules['city'] = 'required|string';
        } else {
            $rules['country'] = 'required|string';
            $rules['city'] = 'nullable|string';
        }

        try {
            $credentials = $request->validate($rules);
            $credentials['user_id'] = Auth::user()->id;

            Travel::create($credentials);

            return response()->json(['message' => 'Travel created successfully'], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
}
