<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'name' => 'Emergency Plumbing',
                'description' => '24/7 emergency plumbing services for your home or business',
                'price' => 99.99,
                'duration' => '30 min',
                'rating' => 4.5,
                'category_id' => 1
            ],
            [
                'name' => 'Electrical Installation',
                'description' => 'Professional electrical installation and repair services',
                'price' => 149.99,
                'duration' => '1 hour',
                'rating' => 4.8,
                'category_id' => 2
            ],
            [
                'name' => 'Deep Cleaning',
                'description' => 'Thorough cleaning service for your home or office',
                'price' => 199.99,
                'duration' => '2 hours',
                'rating' => 4.7,
                'category_id' => 3
            ],
            [
                'name' => 'General Repairs',
                'description' => 'Comprehensive handyman services for all your needs',
                'price' => 79.99,
                'duration' => '1 hour',
                'rating' => 4.6,
                'category_id' => 4
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 