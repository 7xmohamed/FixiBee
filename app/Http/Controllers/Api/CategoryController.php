<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'name', 'description')
            ->get();

        return response()->json([
            'data' => $categories
        ]);
    }

    public function show($id)
    {
        $category = Category::select('id', 'name', 'description')
            ->findOrFail($id);

        return response()->json([
            'data' => $category
        ]);
    }
} 