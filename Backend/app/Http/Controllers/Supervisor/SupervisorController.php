<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Data\AnesthesiaMode;
use App\Models\Data\AsapsClassification;
use App\Models\Data\Assessment;
use App\Models\Data\CoreSkill;
use App\Models\Data\Facility;
use App\Models\Data\Icu;
use App\Models\Data\IcuPrimarySpecialty;
use App\Models\Data\Operation;
use App\Models\Data\ProcedureSpecialty;
use App\Models\Data\Specialty;
use App\Models\Logbook\Anesthetic;
use App\Models\Logbook\Intensive;
use App\Models\Logbook\Procedure;
use App\Models\Logbook\Rotation;
use App\Models\Pivots\ProcedureSkill;
use App\Models\Users\Resident;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

class SupervisorController extends Controller
{
    public function __construct()
    {
        Config::set('auth.defaults.guard', 'adminApi');
    }
    public function residents()
    {
        $residents = Resident::where('supervisor_ID', auth()->user()->id)->select('NID', 'name', 'gender', 'email', 'birthdate', 'residencyYear')->get();
        return response()->json(['Residents' => $residents]);
    }
    public function portfolio(Request $request)
    {
        $acData = [];
        $icData = [];
        $pcData = [];
        $rData = [];
        $resident = Resident::where('NID', $request->id)->select('id', 'NID', 'name', 'gender', 'email', 'birthdate', 'residencyYear')->first();
        $ac = Anesthetic::where('pending', 0)->where('residentID', $resident->id)->get();
        if (count($ac) <= 0)
            goto Skip1;
        foreach ($ac as $case) {
            $facility = Facility::where('id', $case->facilityID)->select('name')->first();
            $gender = "";
            if ($case->gender == 'm') {
                $gender = "Male";
            } else {
                $gender = "Female";
            }
            $class = AsapsClassification::where('id', $case->asapsClassID)->select('class')->first();
            $primary = Specialty::where('id', $case->primarySpecialtyID)->select('specialty')->first();
            $operation = Operation::where('id', $case->primaryOperationID)->select('title')->first();
            $mode = AnesthesiaMode::where('id', $case->modeOfAnesthesiaID)->select('mode')->first();
            $tmp = [
                'id' => $case->id,
                'date' => $case->date,
                'facility' => $facility->name,
                'gender' => $gender,
                'age' => $case->age,
                'class' => $class->class,
                'primary' => $primary->specialty,
                'operation' => $operation->title,
                'mode' => $mode->mode
            ];
            array_push($acData, $tmp);
        }

        Skip1:
        $ic = Intensive::where('pending', 0)->where('residentID', $resident->id)->get();
        if (count($ic) <= 0)
            goto Skip2;
        foreach ($ic as $case) {
            $facility = Icu::where('id', $case->facilityID)->select('name')->first();
            $specialty = IcuPrimarySpecialty::where('id', $case->icuPrimarySpecialtyID)->select('specialty')->first();
            $gender = "";
            if ($case->gender == 'm') {
                $gender = "Male";
            } else {
                $gender = "Female";
            }
            $tmp = [
                'id' => $case->id,
                'date' => $case->date,
                'facility' => $facility->name,
                'gender' => $gender,
                'age' => $case->age,
                'specialty' => $specialty->specialty,
                'diagnosis' => $case->primaryDiagnosis
            ];
            array_push($icData, $tmp);
        }

        Skip2:
        $pc = Procedure::where('pending', 0)->where('residentID', $resident->id)->get();
        if (count($pc) <= 0)
            goto Skip3;
        foreach ($pc as $case) {
            $facility = Facility::where('id', $case->facilityID)->select('name')->first();
            $specialty = ProcedureSpecialty::where('id', $case->procedureSpecialtyID)->select('specialty')->first();
            $pSkill = ProcedureSkill::where('procedureCaseID', $case->id)->select('coreSkillID')->first();
            $skill = CoreSkill::where('id', $pSkill->coreSkillID)->select('skill')->first();
            $gender = "";
            if ($case->gender == 'm') {
                $gender = "Male";
            } else {
                $gender = "Female";
            }
            $tmp = [
                'id' => $case->id,
                'date' => $case->date,
                'facility' => $facility->name,
                'gender' => $gender,
                'age' => $case->age,
                'specialty' => $specialty->specialty,
                'pType' => $skill->skill
            ];
            array_push($pcData, $tmp);
        }

        Skip3:
        $r = Rotation::where('pending', 0)->where('residentID', $resident->id)->select('name', 'startDate', 'endDate', 'stage')->get();
        if (count($r) <= 0)
            goto LastSkip;
        foreach ($r as $rotation) {
            $stage = '';
            if ($rotation->stage == 1)
                $stage = 'Residency Year 1';
            else if ($rotation->stage == 2)
                $stage = 'Residency Year 2';
            else
                $stage = 'Residency Year 3';
            $tmp = [
                'stage' => $stage,
                'name' => $rotation->name,
                'startDate' => $rotation->startDate,
                'endDate' => $rotation->endDate,
            ];
            array_push($rData, $tmp);
        }

        LastSkip:
        $tables = [
            'Resident' => $resident,
            'ACase' => $acData,
            'ICase' => $icData,
            'PCase' => $pcData,
            'Rotations' => $rData
        ];
        return response()->json($tables);
    }
    public function Assessment()
    {
        $assessments = Assessment::where('pending', 1)->where('clinicalID', auth()->user()->id)->get();
        return response()->json($assessments);
    }
    public function acceptAssessment(Request $request)
    {
        Assessment::where('id', $request->id)->update(['pending' => 0]);
        return response()->json(['message' => 'Done']);
    }
}
