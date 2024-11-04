<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TravelController extends Controller
{
    public function create(Request $request)
    {
        $user_id = Auth::id();

        // Vérifiez si l'utilisateur a déjà un voyage en cours
        $userHaveInProgressJourney = Travel::where('user_id', $user_id)
            ->whereNull('ended_at')
            ->exists();

        if ($userHaveInProgressJourney) {
            return response()->json(['message' => 'User already has a travel in progress'], 401);
        }

        // Définir les règles de validation
        $rules = [
            'name' => 'required|string',
            'beginning_at' => 'required|date|after_or_equal:today',
            'ended_at' => 'nullable|date|after:beginning_at',
        ];

        if (!$request->input('country')) {
            $rules['city'] = 'required|string';
        } else {
            $rules['country'] = 'required|string';
            $rules['city'] = 'nullable|string';
        }

        // Messages d'erreur personnalisés
        $messages = [
            'name.required' => 'Le nom est obligatoire.',
            'beginning_at.required' => 'La date de début est obligatoire.',
            'beginning_at.after_or_equal' => 'La date de début doit être aujourd’hui ou plus tard.',
            'ended_at.after' => 'La date de fin doit être après la date de début.',
            'city.required' => 'La ville est obligatoire si le pays n’est pas fourni.',
            'country.required' => 'Le pays est obligatoire si la ville n’est pas fournie.',
        ];

        // Validation des données
        try {
            $validatedData = $request->validate($rules, $messages);
            $validatedData['user_id'] = $user_id;

            Travel::create($validatedData);

            return response()->json(['message' => 'Travel created successfully'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the travel.'], 500);
        }
    }

    public function getUserTravels()
    {
        $user_id = Auth::user()->id;
        $travels =  Travel::where('user_id', $user_id)->orderByDesc('created_at')
            ->get()->makeHidden(['user_id']);
        return $travels;
    }

    public function close(string $id)
    {
        $user_id = Auth::user()->id;
        $travel = Travel::where('id', $id)->where('user_id', $user_id)
            ->where('ended_at', null)->first();

        if (!$travel) {
            return response()->json(['message' => 'Travel not found or already closed'], 404);
        }

        $travel->ended_at = Carbon::now()->format('Y-m-d');
        $travel->save();

        return response()->json(['message' => 'Travel closed successfully']);
    }

    public function cancel(string $id)
    {
        $user_id = Auth::user()->id;
        $travel = Travel::where('id', $id)->where('user_id', $user_id)
            ->where('ended_at', null)->first();

        if (!$travel) {
            return response()->json(['message' => 'Travel not found'], 404);
        }

        $travel->delete();

        return response()->json(['message' => 'Travel canceled successfully']);
    }

    public function rename(Request $request, string $id)
    {
        $rule = [
            'new_name' => 'required|string',
        ];

        try {
            $validatedData = $request->validate($rule);

            $user_id = Auth::user()->id;

            $travel = Travel::where('id', $id)->where('user_id', $user_id)->first();

            if (!$travel) {
                return response()->json(['message' => 'Travel not found'], 404);
            }

            $travel->name = $validatedData['new_name'];

            $travel->save();

            return response()->json(['message' => 'Travel renamed successfully']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }
}