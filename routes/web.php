<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostToggleLike;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Request -> Laravel -> http://localhost:8000 -> [Middleware 1] -> Route -> Response

// http://localhost:8000

// http://localhost:8000 + /
Route::get('/', function () {
    return Inertia::render('home');
})->name('home.index');

// http://localhost:8000/about
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about.index');

// http://localhost:8000/1

Route::get('/auth/register', [RegisterController::class, 'create']);
Route::post('/auth/register', [RegisterController::class, 'store']);

Route::get('/auth/login', [LoginController::class, 'create']);
Route::post('/auth/login', [LoginController::class, 'store']);
Route::post('/auth/logout', [LoginController::class, 'destroy']);

Route::post('/posts/{post}/likes/toggle', PostToggleLike::class);

Route::get('/posts/create', [PostController::class, 'create']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/posts', [PostController::class, 'store']);

Route::post('/comments', [CommentController::class, 'store']);