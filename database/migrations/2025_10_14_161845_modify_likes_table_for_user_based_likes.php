<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropUnique(['post_id', 'ip_address', 'user_agent']);

            $table->dropColumn(['ip_address', 'user_agent']);

            $table->foreignId('user_id')->after('post_id')->constrained()->onDelete('cascade');

            $table->unique(['post_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropUnique(['post_id', 'user_id']);

            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            $table->string('ip_address');
            $table->text('user_agent');

            // Ensure one like per IP/user agent combination per post
            $table->unique(['post_id', 'ip_address', 'user_agent']);
        });
    }
};
