<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ToggleLikeController;
use App\Http\Controllers\UserController;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Request -> Laravel -> http://localhost:8000 -> [Middleware 1] -> Route -> Response

// http://localhost:8000
Route::get('/', function () {
    return redirect('/posts');
});

// http://localhost:8000/1

Route::get('/api/search', SearchController::class)->name('search');

Route::get('/auth/register', [RegisterController::class, 'create'])->name('auth.register');
Route::post('/auth/register', [RegisterController::class, 'store']);

Route::get('/auth/login', [LoginController::class, 'create'])->name('auth.login');
Route::post('/auth/login', [LoginController::class, 'store']);
Route::post('/auth/logout', [LoginController::class, 'destroy']);

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');

Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');

Route::middleware('auth')->group(function () {
    Route::post('/{type}/{id}/likes/toggle', ToggleLikeController::class)->name('likes.toggle');

    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');

    Route::post('/users/{id}/follow', [\App\Http\Controllers\FollowController::class, '__invoke'])->name('users.follow');

    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
});

Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');