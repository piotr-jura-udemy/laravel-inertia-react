<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    // index, show, edit, update...
    public function show(string $id): Response {
        return Inertia::render('posts/show', [
            'post' => Post::findOrFail($id)
        ]);
    }
}
