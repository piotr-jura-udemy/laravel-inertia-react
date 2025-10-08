<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PostLikedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public User $liker,
        public Post $post
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'post_like',
            'actor_id' => $this->liker->id,
            'actor_name' => $this->liker->name,
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'message' => "{$this->liker->name} liked your post",
        ];
    }
}
