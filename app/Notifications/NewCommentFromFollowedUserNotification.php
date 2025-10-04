<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewCommentFromFollowedUserNotification extends Notification
{
    use Queueable;

    public function __construct(
        public User $author,
        public Comment $comment
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_comment',
            'actor_id' => $this->author->id,
            'actor_name' => $this->author->name,
            'comment_id' => $this->comment->id,
            'post_id' => $this->comment->post_id,
            'message' => "{$this->author->name} commented on a post",
        ];
    }
}
