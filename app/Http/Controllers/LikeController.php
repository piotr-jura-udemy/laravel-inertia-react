<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        // Check if already liked
        $existingLike = Like::where([
            'post_id' => $post->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ])->first();

        if ($existingLike) {
            return back()->with('error', 'Already liked');
        }

        Like::create([
            'post_id' => $post->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ]);

        return back()->with('success', 'Liked successfully');
    }

    public function destroy(Request $request, Post $post)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        $like = Like::where([
            'post_id' => $post->id,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ])->first();

        if (!$like) {
            return back()->with('error', 'Not liked');
        }

        $like->delete();

        return back()->with('success', 'Unliked successfully');
    }
}
