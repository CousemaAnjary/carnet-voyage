<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelContent extends Model
{
    use HasFactory;

    protected $table = 'travel_contents';

    protected $fillable = [
        'img_url',
        'description',
        'location',
        'taken_at',
    ];
}
