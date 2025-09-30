<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeToggleController extends Controller
{
    public function __invoke(Request $request, Post $post)
    {
        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();

        $existingLike = $post->likes->where([
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ])->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            $post->likes()->create([
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
            ]);
            $action = 'liked';
        }

        return back();
    }
}
