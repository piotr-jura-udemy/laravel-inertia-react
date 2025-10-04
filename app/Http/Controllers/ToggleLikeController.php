<?php

namespace App\Http\Controllers;

use App\Notifications\CommentLikedNotification;
use App\Notifications\PostLikedNotification;
use Illuminate\Http\Request;

class ToggleLikeController extends Controller
{
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

        $model = $modelClass::with('user')->findOrFail($id);
        $existingLike = $model->likes()->where('user_id', $request->user()->id)->first();

        if ($existingLike) {
            $existingLike->delete();

            // Delete notification
            $notificationClass = $type === 'posts'
                ? PostLikedNotification::class
                : CommentLikedNotification::class;

            $model->user->notifications()
                ->where('type', $notificationClass)
                ->where('data->actor_id', $request->user()->id)
                ->delete();
        } else {
            $model->likes()->create([
                'user_id' => $request->user()->id
            ]);

            // Send notification to author (not for self-likes)
            if ($model->user_id !== $request->user()->id) {
                if ($type === 'posts') {
                    $model->user->notify(new PostLikedNotification($request->user(), $model));
                } else {
                    $model->user->notify(new CommentLikedNotification($request->user(), $model));
                }
            }
        }

        return back();
    }
}
