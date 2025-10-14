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

            // Remove old columns
            $table->dropColumn(['ip_address', 'user_agent']);

            // Add user_id column
            $table->foreignId('user_id')->after('post_id')->constrained()->onDelete('cascade');

            // Add new unique constraint to prevent duplicate likes from same user
            $table->unique(['post_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // Drop the user-based unique constraint
            $table->dropUnique(['post_id', 'user_id']);

            // Remove user_id
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            // Add back old columns
            $table->string('ip_address');
            $table->text('user_agent');

            // Add back old unique constraint
            $table->unique(['post_id', 'ip_address', 'user_agent']);
        });
    }
};
