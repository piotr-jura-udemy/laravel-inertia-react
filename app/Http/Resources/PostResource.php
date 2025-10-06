<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'title' => $this->title,
            'body' => $this->body,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn() => UserResource::make($this->user)->toArray($request)),
            'likes_count' => $this->when(isset($this->likes_count), $this->likes_count),
            'comments_count' => $this->when(isset($this->comments_count), $this->comments_count),
            'is_boosted' => $this->is_boosted,
            'boosted_at' => $this->boosted_at?->toISOString(),
            'boosted_until' => $this->boosted_until?->toISOString(),
        ];
    }
}
