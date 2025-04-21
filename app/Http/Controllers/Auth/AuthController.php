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
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:client,professional',
            'address' => 'required|string',
            'phone' => 'required|string',
        ];

        // Only require ID card files for professional registration
        if ($request->role === 'professional') {
            $rules['id_card_front'] = 'required|file|mimes:jpeg,png,jpg|max:2048';
            $rules['id_card_back'] = 'required|file|mimes:jpeg,png,jpg|max:2048';
        }

        $request->validate($rules);

        // Handle file uploads for professionals
        $idCardFrontPath = null;
        $idCardBackPath = null;
        if ($request->role === 'professional') {
            $idCardFrontPath = $this->storeFile($request->file('id_card_front'), 'id_cards');
            $idCardBackPath = $this->storeFile($request->file('id_card_back'), 'id_cards');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'address' => $request->address,
            'phone' => $request->phone,
            'id_card_front' => $idCardFrontPath,
            'id_card_back' => $idCardBackPath,
        ]);

        event(new Registered($user));

        // Create a new token with a unique name
        $token = $user->createToken('auth_token_' . Str::random(10))->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        // Revoke all existing tokens for this user
        $user->tokens()->delete();
        
        // Create a new token with a unique name
        $token = $user->createToken('auth_token_' . Str::random(10))->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    private function storeFile($file, $directory)
    {
        if (!$file) {
            return null;
        }

        // Generate a unique filename
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        
        // Store the file in the specified directory
        $path = $file->storeAs($directory, $filename, 'public');
        
        return $path;
    }
} 