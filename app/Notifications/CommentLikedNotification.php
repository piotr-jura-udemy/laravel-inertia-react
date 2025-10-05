<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CommentLikedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public User $liker,
        public Comment $comment
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'comment_like',
            'actor_id' => $this->liker->id,
            'actor_name' => $this->liker->name,
            'comment_id' => $this->comment->id,
            'post_id' => $this->comment->post_id,
            'message' => "{$this->liker->name} liked your comment",
        ];
    }
}
