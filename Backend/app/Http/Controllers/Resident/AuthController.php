<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Models\Users\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function __construct()
    {
        Config::set('auth.defaults.guard', 'api');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ], [
            'username.required' => 'Please enter your username.',
            'password.required' => 'Please enter your password.',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'ERROR! Invalid username or password.'], 404);
        }
        if (auth()->user()->pending == 1) {
            return response()->json(['error' => 'Your account is still pending.'], 403);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nid' => 'required|unique:residents|min:14|max:14',
            'name' => 'required|min:10|max:100',
            'username' => 'required|unique:residents|min:5|max:100',
            'password' => 'required|min:8|max:200',
            'confirmPassword' => 'required|same:password',
            'email' => 'required|email|unique:residents',
            'gender' => 'required',
            'residency' => 'required',
            'bdate' => 'required',
        ], [
            'nid.required' => 'National ID is required.',
            'nid.unique' => 'National ID is already taken.',
            'nid.max' => 'National ID is invalid.',
            'nid.min' => 'National ID is invalid.',
            'name.required' => 'Name is required.',
            'name.max' => 'Name is too long (maximum: 100 characters).',
            'name.min' => 'Name is too short (minimum: 10 characters).',
            'username.unique' => 'Username is already taken.',
            'username.max' => 'Username is too long (maximum: 100 characters).',
            'username.min' => 'Username is too short (minimum: 5 characters).',
            'username.required' => 'Username is required.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be 8 characters at least.',
            'confirmPassword.same' => 'Password mismatch.',
            'confirmPassword.required' => 'Please confirm account password.',
            'email.unique' => 'Email is already taken.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email is invalid.',
            'bdate.required' => 'Date of birth is required.',
            'gender.required' => 'Please select gender.',
            'residency.required' => 'Please select year.',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        Resident::create(
            [
                'NID' => $request->nid,
                'name' => ucwords($request->name),
                'gender' => $request->gender,
                'birthdate' => $request->bdate,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'email' => $request->email,
                'residencyYear' => $request->residency,
            ]
        );
        return response()->json(['message' => 'User successfully registered'], 200);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function user()
    {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'info' => auth()->user()
        ]);
    }
}
