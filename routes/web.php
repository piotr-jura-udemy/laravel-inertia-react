<?php

use Illuminate\Support\Facades\Route;

// Request -> Laravel -> http://localhost:8000 -> [Middleware 1] -> Route -> Response

Route::get('/', function () {
    return view('welcome');
});