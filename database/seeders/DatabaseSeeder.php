<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use App\Models\Like;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();

        $posts = Post::factory(20)->create([
            'user_id' => fn() => $users->random()->id
        ]);

        // Create comments for posts
        foreach ($posts as $post) {
            Comment::factory(rand(2, 8))->create([
                'post_id' => $post->id,
                'user_id' => fn() => $users->random()->id
            ]);
        }

        // Create likes for posts (some users like some posts)
        foreach ($posts as $post) {
            $likers = $users->random(rand(1, 6));
            foreach ($likers as $user) {
                Like::firstOrCreate([
                    'post_id' => $post->id,
                    'user_id' => $user->id
                ]);
            }
        }
    }
}
