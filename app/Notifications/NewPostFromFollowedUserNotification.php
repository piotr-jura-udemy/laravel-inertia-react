<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewPostFromFollowedUserNotification extends Notification
{
    use Queueable;

    public function __construct(
        public User $author,
        public Post $post
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_post',
            'actor_id' => $this->author->id,
            'actor_name' => $this->author->name,
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'message' => "{$this->author->name} created a new post",
        ];
    }
}
