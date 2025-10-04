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
    public function index(Request $request): Response
    {
        $view = $request->query('view', 'all');

        $query = Post::with('user')->withCount(['likes', 'comments']);

        switch ($view) {
            case 'followed':
                if (!auth()->check()) {
                    abort(403, 'You must be logged in to view followed posts');
                }
                $followingIds = auth()->user()->following()->pluck('users.id');
                $query->whereIn('user_id', $followingIds);
                break;
            case 'popular':
                $query->where('created_at', '>=', now()->subDays(7))
                    ->orderByDesc('likes_count');
                break;
            default:
                $query->latest();
                break;
        }

        $posts = $query->get();

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($posts)->toArray(request()),
            'currentView' => $view,
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
