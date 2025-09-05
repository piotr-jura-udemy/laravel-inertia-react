<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Helpers\TempAuth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', [
            'posts' => Post::with('user')->latest()->get()
        ]);
    }

    // index, show, edit, update...
    public function show(string $id): Response
    {
        $post = Post::with([
            'user',
            'comments' => function ($query) {
                $query->with('user')->latest();
            },
            'likes'
        ])->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => $post,
            'comments' => $post->comments,
            'likes_count' => $post->likes->count(),
            'user_liked' => TempAuth::check() ? $post->likes->contains('user_id', TempAuth::id()) : false,
            'current_user' => TempAuth::user()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:10|max:255'
        ]);

        Post::create([
            ...$validated,
            'user_id' => TempAuth::id()
        ]);

        return redirect('/posts');
    }
}
