<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
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
                if (auth()->check()) {
                    $followingIds = auth()->user()->following()->pluck('users.id');
                    $query->whereIn('user_id', $followingIds);
                } else {
                    // Return empty result for unauthenticated users
                    $query->whereRaw('1 = 0');
                }
                break;
            case 'popular':
                $query->where('created_at', '>=', now()->subDays(7))
                    ->orderByDesc('likes_count');
                break;
            default:
                // Default ordering handled below
                break;
        }

        // Always show boosted posts first across all views
        $query->orderByDesc('is_boosted');

        // Apply secondary ordering based on view
        if ($view === 'popular') {
            $query->orderByDesc('likes_count');
        } else {
            $query->latest();
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
            'likes' => Inertia::defer(fn() => $post->getLikesData()),
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
            'body' => 'required|string|min:10|max:255',
        ]);

        $post = Post::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        // Notify followers
        $followers = $request->user()->followers;
        foreach ($followers as $follower) {
            $follower->notify(new \App\Notifications\NewPostFromFollowedUserNotification($request->user(), $post));
        }

        return redirect('/posts');
    }
}
