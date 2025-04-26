<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProController extends Controller
{
    public function index($ProId)
    {
        // Fetch the Pro details from the database
        $pro = User::find($ProId);

        if (!$pro) {
            return response()->json(['message' => 'Pro not found'], 404);
        }

        // Return the Pro details
        return response()->json($pro);
    }

}
