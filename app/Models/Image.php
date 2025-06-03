<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
        protected $fillable = [
        'professional_id',
        'url',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class);
    }
}
