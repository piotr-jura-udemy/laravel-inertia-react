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
        // Create authors (users who create posts)
        $authors = User::factory(5)->create();

        // Create commenters (users who only comment and like)
        $commenters = User::factory(5)->create();

        // All users combined
        $allUsers = $authors->concat($commenters);

        // Create posts by authors
        $authors->each(function ($author) {
            Post::factory(3)->create(['user_id' => $author->id]);
        });

        $posts = Post::all();

        // Create comments (both authors and commenters can comment)
        $posts->each(function ($post) use ($allUsers) {
            Comment::factory(rand(2, 6))->create([
                'post_id' => $post->id,
                'user_id' => $allUsers->random()->id,
            ]);
        });

        $comments = Comment::all();

        // Create likes for posts
        $posts->each(function ($post) use ($allUsers) {
            $likers = $allUsers->random(rand(0, 5));
            foreach ($likers as $liker) {
                Like::factory()->create([
                    'likeable_type' => Post::class,
                    'likeable_id' => $post->id,
                    'user_id' => $liker->id,
                ]);
            }
        });

        // Create likes for comments
        $comments->each(function ($comment) use ($allUsers) {
            $likers = $allUsers->random(rand(0, 3));
            foreach ($likers as $liker) {
                Like::factory()->create([
                    'likeable_type' => Comment::class,
                    'likeable_id' => $comment->id,
                    'user_id' => $liker->id,
                ]);
            }
        });
    }
}
