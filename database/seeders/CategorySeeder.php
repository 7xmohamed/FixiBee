<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Plumbing',
                'description' => 'Expert plumbing services for your home and business'
            ],
            [
                'name' => 'Electrical',
                'description' => 'Professional electrical repairs and installations'
            ],
            [
                'name' => 'Cleaning',
                'description' => 'Top-quality cleaning services for any space'
            ],
            [
                'name' => 'Handyman',
                'description' => 'General repairs and maintenance solutions'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
} 