<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelContent extends Model
{
    use HasFactory;

    protected $table = 'travelContents';

    protected $fillable = [
        'img_url',
        'title',
        'comment',
        'location',
        'taken_at',
    ];
}
