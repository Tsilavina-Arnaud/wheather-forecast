<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $ipAddress = $request->ip();
        $city = $request->city;

        User::upsert(
            [
                'ip_address' => $ipAddress,
                'favorite_city' => $city
            ],
            [
                'ip_address',
            ],
            [
                'favorite_city'
            ]
        );

        return \response()->json(['success' => 'Your favorite city is registered']);
    }

    public function find(Request $request)
    {
        $response = '';
        $user = User::where('ip_address', $request->ip())->get('favorite_city');
        if ($user->isEmpty()) {
            $response = 'No user found';
        } else {
            $response = $user[0];
        }

        return \response()->json(['data' => $response]);
    }
}
