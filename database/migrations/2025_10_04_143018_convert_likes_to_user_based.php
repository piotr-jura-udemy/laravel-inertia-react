<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Drop old likes table (we can't migrate IP-based likes to user-based)
        Schema::dropIfExists('likes');

        // Create new likes table with user_id
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->morphs('likeable');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['likeable_type', 'likeable_id', 'user_id']);
        });
    }

    public function down(): void
    {
        // Rename current table
        Schema::rename('likes', 'likes_new');

        // Recreate old structure
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->morphs('likeable');
            $table->string('ip_address');
            $table->text('user_agent');
            $table->timestamps();

            $table->unique(['likeable_type', 'likeable_id', 'ip_address', 'user_agent'], 'likes_unique');
        });

        // Drop new table
        Schema::dropIfExists('likes_new');
    }
};
