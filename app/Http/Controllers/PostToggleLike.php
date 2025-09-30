<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostToggleLike extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post)
    {
        $ip = $request->ip();
        $userAgent = $request->userAgent();

        $existingLike = $post->likes()->where([
            'ip_address' => $ip,
            'user_agent' => $userAgent
        ])->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            $post->likes()->create([
                'ip_address' => $ip,
                'user_agent' => $userAgent
            ]);
        }

        return back();
    }
}
