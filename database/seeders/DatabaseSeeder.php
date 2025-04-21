<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Remove direct creation of the test user to avoid duplicate email
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'phone' => '1234567890',
        //     'address' => '123 Main St',
        // ]);

        if (app()->environment('local')) {
            $this->call([
                TestUserSeeder::class,
            ]);
        }

        $this->call([
            CategorySeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
