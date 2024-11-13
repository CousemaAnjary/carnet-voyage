<?php

use App\Http\Controllers\Api\TravelContentController;
use App\Http\Controllers\Api\TravelController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Auth;
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
        return response()->json([
            'message' => 'You are authenticated',
            'user' => Auth::user(),
        ]);
    });

    Route::prefix('/travel')->group(function() {
        Route::get('/', [TravelController::class, 'getUserTravels']);
        Route::post('/create', [TravelController::class, 'create']);
        Route::patch('/close/{id}', [TravelController::class, 'close']);
        Route::patch('/rename/{id}', [TravelController::class, 'rename']);
        Route::delete('/cancel/{id}', [TravelController::class, 'cancel']);

        Route::get('/{id}/content', [TravelContentController::class, 'getTravelContents']);
        
        Route::prefix('/content')->group(function(){
            Route::post('/upload', [TravelContentController::class, 'upload']);
            Route::delete('/delete/{id}', [TravelContentController::class, 'delete']);
            Route::patch('/edit/{id}', [TravelContentController::class, 'edit']);
        });
    });
});