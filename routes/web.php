<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Helpers\TempAuth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Request -> Laravel -> http://localhost:8000 -> [Middleware 1] -> Route -> Response

// http://localhost:8000

// http://localhost:8000 + /
Route::get('/', function () {
    return Inertia::render('home');
});

// http://localhost:8000/about
Route::get('/about', function () {
    return Inertia::render('about');
});

// http://localhost:8000/1
Route::get('/posts/create', [PostController::class, 'create']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/posts', [PostController::class, 'store']);

// Comments routes
Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

// Likes routes  
Route::post('/posts/{post}/toggle-like', [LikeController::class, 'toggle'])->name('likes.toggle');

// Temporary auth routes (for testing without real auth)
Route::get('/temp-logout', function () {
    TempAuth::logout();
    return redirect()->back()->with('message', 'Switched to new temporary user!');
})->name('temp.logout');