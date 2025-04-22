<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Base validation rules
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:client,professional'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
        ];

        // Additional validation for professionals
        if ($request->role === 'professional') {
            $rules['id_card_front'] = ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:2048'];
            $rules['id_card_back'] = ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:2048'];
        }

        $validated = $request->validate($rules);

        // Handle file uploads for professionals
        $idCardPaths = $this->handleProfessionalDocuments($request);

        // Create user with validated data
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'id_card_front' => $idCardPaths['front'] ?? null,
            'id_card_back' => $idCardPaths['back'] ?? null,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return response()->json([
            'user' => $user,
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $user->tokens()->delete(); // Revoke existing tokens
        
        return response()->json([
            'user' => $user,
            'access_token' => $user->createToken('auth_token_' . Str::random(10))->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    private function handleProfessionalDocuments(Request $request)
    {
        if ($request->role !== 'professional') {
            return ['front' => null, 'back' => null];
        }

        return [
            'front' => $request->file('id_card_front')->store('users/id-cards', 'public'),
            'back' => $request->file('id_card_back')->store('users/id-cards', 'public')
        ];
    }
}