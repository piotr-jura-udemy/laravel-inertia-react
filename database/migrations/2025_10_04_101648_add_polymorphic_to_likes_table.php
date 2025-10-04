<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // Drop the old unique constraint
            $table->dropUnique(['post_id', 'ip_address', 'user_agent']);

            // Drop the foreign key and post_id column
            $table->dropForeign(['post_id']);
            $table->dropColumn('post_id');

            // Add polymorphic columns
            $table->morphs('likeable');

            // Add new unique constraint
            $table->unique(['likeable_type', 'likeable_id', 'ip_address', 'user_agent'], 'likes_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // Drop the polymorphic unique constraint
            $table->dropUnique('likes_unique');

            // Drop polymorphic columns
            $table->dropMorphs('likeable');

            // Restore post_id column
            $table->foreignId('post_id')->constrained()->onDelete('cascade');

            // Restore old unique constraint
            $table->unique(['post_id', 'ip_address', 'user_agent']);
        });
    }
};
