<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with(['category', 'professional'])->get();
        return response()->json($services);
    }

    public function featured()
    {
        $services = Service::with(['category', 'professional'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();
        return response()->json($services);
    }

    public function show(Service $service)
    {
        return response()->json($service->load(['category', 'professional']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'address' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $service = Service::create([
            ...$request->all(),
            'professional_id' => auth()->id(),
            'total_price' => $request->price,
        ]);

        return response()->json($service->load(['category', 'professional']), 201);
    }

    public function update(Request $request, Service $service)
    {
        // Check if the user owns this service
        if ($service->professional_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'address' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $service->update([
            ...$request->all(),
            'total_price' => $request->price,
        ]);

        return response()->json($service->load(['category', 'professional']));
    }

    public function destroy(Service $service)
    {
        // Check if the user owns this service
        if ($service->professional_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service->delete();
        return response()->json(null, 204);
    }

    public function byCategory($categoryId)
    {
        $services = Service::with(['category', 'professional'])
            ->where('category_id', $categoryId)
            ->where('status', 'active')
            ->get();
        return response()->json($services);
    }

    public function search(Request $request)
    {
        $query = Service::with(['category', 'professional'])
            ->where('status', 'active');

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $services = $query->get();
        return response()->json($services);
    }
} 