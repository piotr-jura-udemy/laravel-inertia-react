<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = $request->input('q', '');

        if (empty($query) || strlen($query) < 2) {
            return response()->json([
                'users' => [],
                'posts' => [],
            ]);
        }

        $users = User::search($query)
            ->take(5)
            ->get();

        $posts = Post::search($query)
            ->take(10)
            ->get()
            ->load('user');

        return response()->json([
            'users' => UserResource::collection($users),
            'posts' => PostResource::collection($posts),
        ]);
    }
}

