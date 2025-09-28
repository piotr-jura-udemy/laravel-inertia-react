<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeToggleController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        $existingLike = Like::where([
            'post_id' => $post->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ])->first();

        if ($existingLike) {
            // Unlike: delete existing like
            $existingLike->delete();
            $action = 'unliked';
        } else {
            // Like: create new like
            Like::create([
                'post_id' => $post->id,
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
            ]);
            $action = 'liked';
        }

        return back()->with('success', "Post {$action} successfully");
    }
}
