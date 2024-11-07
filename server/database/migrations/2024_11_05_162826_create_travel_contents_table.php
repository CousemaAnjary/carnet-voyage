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
        Schema::create('travel_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('travel_id')
                ->constrained('travels')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('img_url')->unique();
            $table->string('description')->nullable();
            $table->string('location')->nullable();
            $table->dateTime('taken_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_contents');
    }
};
