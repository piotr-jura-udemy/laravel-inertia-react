<?php

namespace App\Models\Concerns;

use App\Models\Like;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Http\Request;

trait Likeable
{
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function getLikesData(?Request $request = null): array
    {
        $request = $request ?? request();
        $userId = $request->user()?->id;

        return [
            'count' => $this->likes()->count(),
            'user_has_liked' => $userId
                ? $this->likes()->where('user_id', $userId)->exists()
                : false,
        ];
    }
}
