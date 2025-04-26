
<?php

use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\ServiceController as ApiServiceController;
use App\Http\Controllers\Api\CategoryController as ApiCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// routes/api.php
Route::middleware('auth:sanctum')->put('/updateprofile', [AuthController::class, 'update']);



// Categories (Public)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// Services (Public)
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/featured', [ServiceController::class, 'featured']);
Route::get('/services/category/{category}', [ServiceController::class, 'byCategory']);
Route::get('/services/search', [ServiceController::class, 'search']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Categories (Admin only)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Services (Professional only)
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    // Dashboard routes
    Route::get('/dashboard/stats', function (Request $request) {
        if (! Gate::allows('access-dashboard')) {
            abort(403);
        }

        // Return appropriate stats based on user role
        $user = $request->user();
        if ($user->role === 'admin') {
            return response()->json([
                'totalUsers' => User::count(),
                'totalProfessionals' => User::where('role', 'professional')->count(),
                'totalEarnings' => Booking::sum('total_price'),
                'totalBookings' => Booking::count()
            ]);
        }

        return response()->json([
            'totalBookings' => Booking::where('professional_id', $user->id)->count(),
            'activeBookings' => Booking::where('professional_id', $user->id)
                                    ->where('status', 'active')
                                    ->count(),
            'totalEarnings' => Booking::where('professional_id', $user->id)
                                    ->sum('total_price'),
            'upcomingBookings' => Booking::where('professional_id', $user->id)
                                        ->where('booking_date', '>', now())
                                        ->count()
        ]);
    })->middleware('can:access-dashboard');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::get('/services', [ApiServiceController::class, 'index']);
Route::get('/services/{id}', [ApiServiceController::class, 'show']);
Route::get('/categories', [ApiCategoryController::class, 'index']);
Route::get('/categories/{id}', [ApiCategoryController::class, 'show']);

// Password Reset Routes
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);
Route::get('/dashboard/checkpro/{proId}',[ProController::class,'index']);