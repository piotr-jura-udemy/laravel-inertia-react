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

        // Create active commenters (users who comment and like)
        $activeCommenters = User::factory(3)->create();

        // Create lurkers (users who don't post, comment, or like)
        $lurkers = User::factory(2)->create();

        // Create likers only (users who like but don't comment or post)
        $likersOnly = User::factory(2)->create();

        // All users combined
        $allUsers = $authors->concat($activeCommenters)->concat($lurkers)->concat($likersOnly);

        // Users who can comment (authors and active commenters, but not lurkers or likers-only)
        $commentingUsers = $authors->concat($activeCommenters);

        // Users who can like (everyone except lurkers)
        $likingUsers = $authors->concat($activeCommenters)->concat($likersOnly);

        // Create posts by authors (some authors get fewer/no posts)
        $authors->each(function ($author, $index) {
            // First author gets no posts, others get 2-4 posts
            if ($index === 0) {
                return; // User without posts
            }
            Post::factory(rand(2, 4))->create(['user_id' => $author->id]);
        });

        $posts = Post::all();

        // Create comments (only some posts get comments)
        $posts->each(function ($post, $index) use ($commentingUsers) {
            // Every 3rd post gets no comments
            if ($index % 3 === 0) {
                return; // Post without comments
            }

            // Other posts get 1-5 comments
            Comment::factory(rand(1, 5))->create([
                'post_id' => $post->id,
                'user_id' => $commentingUsers->random()->id,
            ]);
        });

        $comments = Comment::all();

        // Create likes for posts
        $posts->each(function ($post) use ($likingUsers) {
            // Some posts get no likes (rand can return 0)
            $likerCount = rand(0, 6);
            if ($likerCount === 0) {
                return;
            }

            $likers = $likingUsers->random(min($likerCount, $likingUsers->count()));
            foreach ($likers as $liker) {
                Like::firstOrCreate([
                    'likeable_type' => Post::class,
                    'likeable_id' => $post->id,
                    'user_id' => $liker->id,
                ]);
            }
        });

        // Create likes for comments (many comments get no likes)
        $comments->each(function ($comment) use ($likingUsers) {
            // 50% chance of no likes
            if (rand(0, 1) === 0) {
                return; // Comment without likes
            }

            $likerCount = rand(0, 3);
            if ($likerCount === 0) {
                return;
            }

            $likers = $likingUsers->random(min($likerCount, $likingUsers->count()));
            foreach ($likers as $liker) {
                Like::firstOrCreate([
                    'likeable_type' => Comment::class,
                    'likeable_id' => $comment->id,
                    'user_id' => $liker->id,
                ]);
            }
        });
    }
}
