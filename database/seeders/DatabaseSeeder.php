<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)
            ->has(Post::factory()->count(3))
            ->create();
        $posts = Post::all();

        Comment::factory(100)->create([
            'user_id' => fn () => $users->random()->id,
            'post_id' => fn () => $posts->random()->id,
        ]);

        foreach ($users as $user) {
            $randomPosts = $posts->random(rand(5, 10));
            foreach ($randomPosts as $post) {
                Like::create([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                ]);
            }
        }
    }
}
