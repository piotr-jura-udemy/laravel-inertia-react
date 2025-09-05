<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Session;

class TempAuth
{
    /**
     * Get a consistent user for the session
     * This is a temporary solution until proper auth is implemented
     */
    public static function user(): User
    {
        $userId = Session::get('temp_user_id');

        if ($userId && $user = User::find($userId)) {
            return $user;
        }

        // Create or get a random user and store in session
        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        Session::put('temp_user_id', $user->id);

        return $user;
    }

    /**
     * Get the current temporary user ID
     */
    public static function id(): int
    {
        return self::user()->id;
    }

    /**
     * Check if user is "authenticated" (always true for temp auth)
     */
    public static function check(): bool
    {
        return true;
    }

    /**
     * Clear the temporary user session (for testing different users)
     */
    public static function logout(): void
    {
        Session::forget('temp_user_id');
    }
}
