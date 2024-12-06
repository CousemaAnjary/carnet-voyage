<?php

use App\Http\Controllers\Api\DayController;
use App\Http\Controllers\Api\TravelController;
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

    Route::prefix('/travel')->group(function() {
        Route::get('/', [TravelController::class, 'get']);
        Route::post('/create', [TravelController::class, 'create']);
        Route::patch('/close/{id}', [TravelController::class, 'close']);
        Route::delete('/cancel/{id}', [TravelController::class, 'cancel']);
    });

    Route::prefix('/day')->group(function(){
        Route::post('/post', [DayController::class, 'postDay']);
        Route::patch('/edit/{id}', [DayController::class, 'edit']);
    });
});