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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:client,professional'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
        ];

        // Add validation rules for professional role
        if ($request->role === 'professional') {
            $rules['id_card_front'] = ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:2048'];
            $rules['id_card_back'] = ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:2048'];
        }

        $validated = $request->validate($rules);

        // Handle file uploads for professionals
        $idCardFrontPath = null;
        $idCardBackPath = null;
        if ($request->role === 'professional') {
            $idCardFrontPath = $request->file('id_card_front')->store('users/id-cards', 'public');
            $idCardBackPath = $request->file('id_card_back')->store('users/id-cards', 'public');
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'address' => $validated['address'],
            'phone' => $validated['phone'],
            'id_card_front' => $idCardFrontPath,
            'id_card_back' => $idCardBackPath,
        ]);

        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        Auth::login($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
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