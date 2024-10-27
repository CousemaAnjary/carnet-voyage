<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Travel extends Model
{
    use HasFactory;

    protected $fillable = [
        'country',
        'city',
        'beginng_at',
        'ended_at',
    ];

    public function travelContents(): HasMany 
    {
        return $this->hasMany(TravelContent::class);
    }
}
