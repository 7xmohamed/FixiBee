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
                'total_price' => 99.99,
                'duration' => 30,
                'category_id' => 1,
                'professional_id' => 1,
                'address' => '123 Main St',
                'status' => 'active'
            ],
            [
                'name' => 'Electrical Installation',
                'description' => 'Professional electrical installation and repair services',
                'price' => 149.99,
                'total_price' => 149.99,
                'duration' => 60,
                'category_id' => 2,
                'professional_id' => 1,
                'address' => '456 Elm St',
                'status' => 'active'
            ],
            [
                'name' => 'Deep Cleaning',
                'description' => 'Thorough cleaning service for your home or office',
                'price' => 199.99,
                'total_price' => 199.99,
                'duration' => 120,
                'category_id' => 3,
                'professional_id' => 1,
                'address' => '789 Oak St',
                'status' => 'active'
            ],
            [
                'name' => 'General Repairs',
                'description' => 'Comprehensive handyman services for all your needs',
                'price' => 79.99,
                'total_price' => 79.99,
                'duration' => 60,
                'category_id' => 4,
                'professional_id' => 1,
                'address' => '101 Pine St',
                'status' => 'active'
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}