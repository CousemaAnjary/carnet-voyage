<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/signup', [UserController::class, 'signUp']);
Route::post('/auth', [UserController::class, 'auth']);
Route::get('/unauth', [UserController::class, 'unauth'])->name('api.unauth');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'You are authenticated']);
    });
});