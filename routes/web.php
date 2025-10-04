<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ToggleLikeController;
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

Route::get('/auth/register', [RegisterController::class, 'create'])->name('auth.register');
Route::post('/auth/register', [RegisterController::class, 'store']);

Route::get('/auth/login', [LoginController::class, 'create'])->name('auth.login');
Route::post('/auth/login', [LoginController::class, 'store']);
Route::post('/auth/logout', [LoginController::class, 'destroy']);

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

Route::middleware('auth')->group(function () {
    Route::post('/{type}/{id}/likes/toggle', ToggleLikeController::class)->name('likes.toggle');

    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
});