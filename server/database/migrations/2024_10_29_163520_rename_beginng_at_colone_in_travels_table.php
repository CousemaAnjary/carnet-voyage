<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameBeginngAtColoneInTravelsTable extends Migration
{
    public function up()
    {
        Schema::table('travels', function (Blueprint $table) {
            $table->renameColumn('beginng_at', 'beginning_at');
        });
    }

    public function down()
    {
        Schema::table('travels', function (Blueprint $table) {
            $table->renameColumn('beginning_at', 'beginng_at');
        });
    }
}