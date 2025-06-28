<?php

namespace App\Http\Controllers\MoblieApp;

use App\Http\Controllers\Controller;
use App\Models\Logbook\Procedure;
use Illuminate\Http\Request;

class MobileController extends Controller
{
    public function procedure(Request $request)
    {
        $notes = null;
        $supervisorRole = null;
        $gender = 'm';
        if ($request->has('Note')) {
            $notes = $request['Note'];
        }
        if ($request->has('SupervisorRole')) {
            $supervisorRole = $request['SupervisorRole'];
        }
        if ($request['Gender'] == "Male")
            $gender = 'm';
        else
            $gender = 'f';
        Procedure::create([
            'date' => $request['Date'],
            'timeslotID' => $request['Time'],
            'facilityID' => $request['Facility'],
            'gender' => $gender,
            'age' => $request['Age'],
            'ageUnitID' => $request['AgeUnit'],
            'ageCategoryID' => $request['AgeCategory'],
            'procedureSpecialtyID' => $request['Specialty'],
            'others' => null,
            'supervisionID' => $request['Supervision'],
            'supervisorRoleID' => $supervisorRole,
            'notes' => $notes,
            'residentID' => 1,
            'supervisorID' => 1,
        ]);
    }
}
