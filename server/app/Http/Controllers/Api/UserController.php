<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signUp(Request $request){

        $credentials = $request->validate([
            'name' => 'required|string|unique:users',
            'email' => 'required|string|unique:users',
            'password' => 'required|string',
        ]);

        $credentials['password'] = Hash::make($credentials['password']);

        User::create($credentials);

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function auth(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['authenticationError' => 'Invalid email or password'], 401);
        }
    
        $user = Auth::user();
    
        $token = $user->createToken('API Token')->plainTextToken;
    
        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ], 200);
    }    

    public function unauth() {
        return response()->json(['message' => 'You are not authenticated'], 401);
    }
}
