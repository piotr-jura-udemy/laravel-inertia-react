<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function show(string $id): Response
    {
        $user = User::findOrFail($id);

        // Get user's posts
        $posts = $user->posts()
            ->with('user')
            ->withCount('likes')
            ->latest()
            ->get();

        // Get user's comments
        $comments = $user->comments()
            ->with(['user', 'post'])
            ->latest()
            ->get();

        // Get items the user has liked
        $likes = $user->likes()
            ->with([
                'likeable' => function ($query) {
                    $query->with('user');
                }
            ])
            ->latest()
            ->get()
            ->map(function ($like) {
                $likeable = $like->likeable;

                if ($like->likeable_type === 'App\\Models\\Post') {
                    return [
                        'type' => 'post',
                        'data' => PostResource::make($likeable->loadCount('likes'))->toArray(request()),
                    ];
                } elseif ($like->likeable_type === 'App\\Models\\Comment') {
                    return [
                        'type' => 'comment',
                        'data' => CommentResource::make($likeable->load('post'))->toArray(request()),
                    ];
                }

                return null;
            })
            ->filter();

        return Inertia::render('users/show', [
            'profileUser' => UserResource::make($user)->toArray(request()),
            'posts' => PostResource::collection($posts)->toArray(request()),
            'comments' => CommentResource::collection($comments)->toArray(request()),
            'likes' => $likes->values()->toArray(),
        ]);
    }
}

