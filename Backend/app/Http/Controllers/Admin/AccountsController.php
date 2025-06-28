<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Users\Resident;
use App\Models\Users\Supervisor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AccountsController extends Controller
{
    public function pending()
    {
        $pending = DB::table('residents')->select('NID', 'name', 'gender', 'birthdate', 'email', 'residencyYear')->where('pending', 1)->get();
        $supervisors = DB::table('supervisors')->where('accountType', 'A')->select('id', 'name')->get();
        return response()->json([
            'pending' => $pending,
            'supervisors' => $supervisors
        ]);
    }
    public function accept(Request $request)
    {
        $validator = Validator::make($request->all(), ['su' => 'required'], ['su.required' => 'Please select supervisor.']);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        Resident::where('NID', $request->id)->update(['pending' => 0, 'supervisor_id' => $request->su]);
        return response()->json(['message' => 'Account was accepted successfully!'], 200);
    }
    public function reject(Request $request)
    {
        Resident::where('NID', $request->id)->delete();
        return response()->json(['message' => 'Account was deleted successfully!'], 200);
    }

    public function accounts()
    {
        $residents = Resident::select('NID', 'name', 'gender', 'birthdate', 'email', 'residencyYear')->where('pending', 0)->get();
        $supervisors = Supervisor::get();
        return response()->json([
            'Residents' => $residents,
            'Supervisors' => $supervisors
        ]);
    }
    public function edit(Request $request)
    {
        if ($request->has('password')) {
            Supervisor::where('id', $request->all()['id'])->update([
                'name' => $request->all()['name'],
                'username' => $request->all()['username'],
                'email' => $request->all()['email'],
                'accountType' => $request->all()['accountType'],
                'password' => bcrypt($request->all()['password'])
            ]);
        } else {
            Supervisor::where('id', $request->all()['id'])->update([
                'name' => $request->all()['name'],
                'username' => $request->all()['username'],
                'email' => $request->all()['email'],
                'accountType' => $request->all()['accountType'],
            ]);
        }
        return response()->json(['message' => 'Done'], 200);
    }
    public function resdelete(Request $request)
    {
        $residentNID = $request->all()['id'];
        Resident::where('NID', $residentNID)->delete();
        return response()->json(['message' => 'Account was deleted successfully!'], 200);
    }
    public function supdelete(Request $request)
    {
        $supervisorID = $request->all()['id'];
        Supervisor::where('id', $supervisorID)->delete();
        return response()->json(['message' => 'Account was deleted successfully!'], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required|unique:supervisors',
            'password' => 'required|min:8',
            'confirm' => 'required|same:password',
            'email' => 'required|email|unique:supervisors',
            'accountType' => 'required',
        ], [
            'name.required' => 'Name is required.',
            'username.unique' => 'Username is already taken.',
            'username.required' => 'Username is required.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be 8 characters at least.',
            'confirm.same' => 'Password mismatch.',
            'confirm.required' => 'Please confirm account password.',
            'email.unique' => 'Email is already taken.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email is invalid.',
            'accountType.required' => 'Account type is required.',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        Supervisor::create(
            [
                'name' => $request->name,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'email' => $request->email,
                'accountType' => $request->accountType,
            ]
        );
        return response()->json(['message' => 'Account was created successfully'], 200);
    }
}
