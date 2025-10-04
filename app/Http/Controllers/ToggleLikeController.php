<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ToggleLikeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $type, int $id)
    {
        if (!$request->user()) {
            abort(401);
        }

        $modelClass = match ($type) {
            'posts' => \App\Models\Post::class,
            'comments' => \App\Models\Comment::class,
            default => abort(404)
        };

        $model = $modelClass::findOrFail($id);

        $existingLike = $model->likes()->where('user_id', $request->user()->id)->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            $model->likes()->create([
                'user_id' => $request->user()->id
            ]);
        }

        return back();
    }
}
