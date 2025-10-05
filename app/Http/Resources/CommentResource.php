<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Comment */
class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
            'post_id' => $this->post_id,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn () => UserResource::make($this->user)->toArray($request)),
            'post' => $this->whenLoaded('post', fn () => PostResource::make($this->post)->toArray($request)),
            'likes_data' => $this->getLikesData($request),
        ];
    }
}
