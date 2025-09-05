<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Helpers\TempAuth;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $userId = TempAuth::id();

        $existingLike = Like::where('post_id', $post->id)
            ->where('user_id', $userId)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            Like::create([
                'post_id' => $post->id,
                'user_id' => $userId
            ]);
            $liked = true;
        }

        $likesCount = $post->likes()->count();

        return response()->json([
            'liked' => $liked,
            'likes_count' => $likesCount
        ]);
    }
}
