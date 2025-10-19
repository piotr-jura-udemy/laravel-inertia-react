<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        // likes_count
        return Inertia::render('posts/index', [
            'posts' => Inertia::scroll(
                fn () => Post::with('user')
                    ->withCount('likes')
                    ->latest()
                    ->cursorPaginate(10)
            ),
        ]);
    }

    // index, show, edit, update...
    public function show(string $id): Response
    {
        $post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => $post,
            'can' => [
                'update' => Auth::check() && Auth::user()->can('update', $post),
            ],
            'comments' => Inertia::scroll(
                fn () => $post->comments()
                    ->with('user')
                    ->latest()
                    ->cursorPaginate(3)
            ),
            'comments_count' => Inertia::defer(fn () => $post->comments()->count()),
            'likes' => Inertia::defer(
                fn () => [
                    'count' => $post->likes()->count(),
                    'user_has_liked' => Auth::check() ?
                        $post->likes()->where('user_id', Auth::id())->exists() : false,
                ]
            ),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Post::class);

        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Post::class);

        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:10|max:255',
        ]);

        Post::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return redirect('/posts');
    }

    public function edit(Post $post): Response
    {
        Gate::authorize('update', $post);

        return Inertia::render('posts/edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:10|max:255',
        ]);

        $post->update($validated);

        return redirect()->route('posts.show', $post);
    }
}
