<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/user/favorite_city', [UserController::class, 'store']);

Route::get('/user/city', [UserController::class, 'find']);

Route::get('/{pathMatch}', function () {
    return view("welcome");
})->where("pathMatch", '.*');
