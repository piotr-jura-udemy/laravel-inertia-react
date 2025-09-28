<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        // likes_count
        return Inertia::render('posts/index', [
            'posts' => Post::with('user')->withCount('likes')->latest()->get()
        ]);
    }

    // index, show, edit, update...
    public function show(string $id): Response
    {
        $post = Post::with('user')->findOrFail($id);
        return Inertia::render('posts/show', [
            'post' => $post,
            'comments' => Inertia::defer(
                fn() => $post->comments()
                    ->with('user')
                    ->latest()
                    ->get()
            ),
            'likes' => Inertia::defer(
                fn() => [
                    'count' => $post->likes()->count(),
                    'user_has_liked' => $post->likes()->where([
                        'ip_address' => request()->ip(),
                        'user_agent' => request()->userAgent()
                    ])->exists()
                ]
            )
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
            'user_id' => User::inRandomOrder()->first()->id
        ]);

        return redirect('/posts');
    }
}
