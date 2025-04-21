<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('category')
            ->select('id', 'name', 'description', 'price', 'duration', 'rating', 'category_id')
            ->get();

        return response()->json([
            'data' => $services
        ]);
    }

    public function show($id)
    {
        $service = Service::with('category')
            ->select('id', 'name', 'description', 'price', 'duration', 'rating', 'category_id')
            ->findOrFail($id);

        return response()->json([
            'data' => $service
        ]);
    }
} 