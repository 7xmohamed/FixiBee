<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
        protected $fillable = [
        'user_id', 'address', 'date_of_birth', 'gender'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
