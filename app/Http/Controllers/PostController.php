<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
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
        $posts = Post::with('user')
            ->withCount(['likes', 'comments'])
            ->latest()
            ->get();

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($posts)->toArray(request())
        ]);
    }

    public function show(string $id): Response
    {
        $post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => PostResource::make($post)->toArray(request()),
            'comments' => Inertia::defer(fn() => CommentResource::collection(
                $post->comments()->with('user')->latest()->get()
            )->toArray(request())),
            'likes' => Inertia::defer(fn() => $post->getLikesData())
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
