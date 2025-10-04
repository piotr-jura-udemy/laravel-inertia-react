<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\UserFollowedNotification;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function __invoke(Request $request, string $userId)
    {
        $userToFollow = User::findOrFail($userId);
        $currentUser = $request->user();

        if ($currentUser->id === $userToFollow->id) {
            return back()->with('error', 'You cannot follow yourself');
        }

        if ($currentUser->isFollowing($userToFollow)) {
            $currentUser->following()->detach($userToFollow->id);

            // Delete the follow notification
            $userToFollow->notifications()
                ->where('type', UserFollowedNotification::class)
                ->where('data->actor_id', $currentUser->id)
                ->delete();
        } else {
            $currentUser->following()->attach($userToFollow->id);

            // Send notification
            $userToFollow->notify(new UserFollowedNotification($currentUser));
        }

        return back();
    }
}
