<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DayPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'day_id',
        'photo_url',
    ];
}
