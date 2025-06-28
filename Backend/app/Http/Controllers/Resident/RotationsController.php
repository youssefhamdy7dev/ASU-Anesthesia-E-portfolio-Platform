<?php

namespace App\Http\Controllers\Resident;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Logbook\Rotation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class RotationsController extends Controller
{
    public function rotation()
    {
        $Anesthesia = DB::table('rotation_anesthesias')->get();
        $ICU = DB::table('rotation_icus')->get();
        $Clinics = DB::table('rotation_clinics')->get();
        $Academic = DB::table('supervisors')->where('accountType', 'A')->get();
        $Clinical = DB::table('supervisors')->where('accountType', 'C')->get();
        return response()->json([
            'Anesthesia' => $Anesthesia,
            'ICU' => $ICU,
            'Clinics' => $Clinics,
            'Academic' => $Academic,
            'Clinical' => $Clinical
        ]);
    }

    public function rotationSubmit(Request $request)
    {
        $data = $request->all();
        $dataModified = [
            'name' => $data['name'],
            'stage' => $data['stage'],
            'startDate' => $data['startDate'],
            'endDate' => $data['endDate'],
            'academic' => $data['academic'],
            'clinical' => $data['clinical'],
        ];
        $validator = Validator::make($dataModified, [
            'name' => 'required',
            'stage' => 'required',
            'startDate' => 'required',
            'endDate' => 'required',
            'academic' => 'required',
            'clinical' => 'required',
        ], [
            'name.required' => 'Name is required.',
            'stage.required' => 'Stage is required.',
            'startDate.required' => 'Start date is required.',
            'endDate.required' => 'End date is required.',
            'academic.required' => 'Please select a supervisor.',
            'clinical.required' => 'Please select a supervisor.',
        ]);
        $errors = new MessageBag();
        if ($validator->fails()) {
            $errors->merge($validator->errors());
            return response()->json($errors, 400);
        }
        Rotation::create([
            'name' => $dataModified['name'],
            'stage' => $dataModified['stage'],
            'startDate' => $dataModified['startDate'],
            'endDate' => $dataModified['endDate'],
            'academicSupervisorID' => $dataModified['academic'],
            'clinicalSupervisorID' => $dataModified['clinical'],
            'residentID' => auth()->user()->id
        ]);
        return response()->json(['message' => 'Rotation was submitted']);
    }
}
