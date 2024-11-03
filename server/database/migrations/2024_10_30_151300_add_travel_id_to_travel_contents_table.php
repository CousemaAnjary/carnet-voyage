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
        Schema::table('travelContents', function (Blueprint $table) {
            $table->foreignId('travel_id')->constrained('travels')
                ->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('travelContents', function (Blueprint $table) {
            $table->dropForeign(['travel_id']); // Supprime la contrainte de clé étrangère
            $table->dropColumn('travel_id');     // Supprime la colonne travel_id
        });
    }
};
