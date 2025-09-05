<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Helpers\TempAuth;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'body' => 'required|string|max:1000'
        ]);

        Comment::create([
            'post_id' => $post->id,
            'user_id' => TempAuth::id(),
            'body' => $request->body
        ]);

        return redirect()->back();
    }
}
