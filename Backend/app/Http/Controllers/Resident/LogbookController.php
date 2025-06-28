<?php

namespace App\Http\Controllers\Resident;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Logbook\Anesthetic;
use App\Models\Logbook\Intensive;
use App\Models\Logbook\Procedure;
use App\Models\Logbook\RegionalAnesthesia;
use App\Models\Pivots\AnestheticSkill;
use App\Models\Pivots\IntensiveSkill;
use App\Models\Pivots\IntensiveSupport;
use App\Models\Pivots\ProcedureSkill;
use App\Models\Users\Resident;
use App\Traits\LogbookData;
use App\Traits\LogbookValidator;
use Illuminate\Support\Facades\DB;

class LogbookController extends Controller
{
    use LogbookValidator, LogbookData;
    public function shared()
    {
        $time = DB::table('timeslots')->get();
        $ageCategory = DB::table('age_categories')->get();
        $ageUnits = DB::table('age_units')->get();
        $supervision = DB::table('supervisions')->get();
        $supervisorRole = DB::table('supervisor_roles')->get();
        $coreSkill = DB::table('core_skills')->get();
        $coreSkillCategory = DB::table('core_skill_categories')->get();
        return response()->json([
            'Time' => $time,
            'AgeCategory' => $ageCategory,
            'AgeUnits' => $ageUnits,
            'Supervision' => $supervision,
            'SupervisorRole' => $supervisorRole,
            'CoreSkill' => $coreSkill,
            'CoreSkillCategory' => $coreSkillCategory,
        ]);
    }

    public function anesthetic()
    {
        $facility = DB::table('facilities')->get();
        $ASAPS = DB::table('asaps_classifications')->get();
        $casePriority = DB::table('case_priorities')->get();
        $specialty = DB::table('specialties')->get();
        $operation = DB::table('operations')->get();
        $teaching = DB::table('teachings')->get();
        $mode = DB::table('anesthesia_modes')->get();
        $regionalType = DB::table('regional_procedures')->get();
        $technique = DB::table('techniques')->get();
        return response()->json([
            'Facility' => $facility,
            'ASAPS' => $ASAPS,
            'CasePriority' => $casePriority,
            'Specialty' => $specialty,
            'Operation' => $operation,
            'Teaching' => $teaching,
            'ModeOfAnesthesia' => $mode,
            'RegionalType' => $regionalType,
            'Technique' => $technique
        ]);
    }

    public function intensive()
    {
        $facility = DB::table('icus')->get();
        $event = DB::table('events')->get();
        $specialty = DB::table('icu_primary_specialties')->get();
        $teaching = DB::table('teachings')->get();
        $supportType = DB::table('support_types')->get();
        $supportType_Category = DB::table('support_type_categories')->get();
        return response()->json([
            'Facility' => $facility,
            'Event' => $event,
            'Specialty' => $specialty,
            'Teaching' => $teaching,
            'Support' => $supportType,
            'SupportCategory' => $supportType_Category
        ]);
    }

    public function procedure()
    {
        $facility = DB::table('facilities')->get();
        $specialty = DB::table('procedure_specialties')->get();
        return response()->json([
            'Facility' => $facility,
            'Specialty' => $specialty
        ]);
    }

    public function anestheticSubmit(Request $request)
    {
        $Validator = $this->validateAnesthetic($request->all());
        if ($Validator != null) {
            return response()->json($Validator, 400);
        }
        $Resident = Resident::where('id', auth()->user()->id)->first();
        $data = $this->getAnestheticData($request->all());
        $case = Anesthetic::create([
            'date' => $data['date'],
            'timeslotID' => $data['timeslot'],
            'gender' => $data['gender'],
            'facilityID' => $data['facility'],
            'asapsClassID' => $data['class'],
            'age' => $data['age'],
            'ageUnitID' => $data['ageUnit'],
            'ageCategoryID' => $data['ageCategory'],
            'casePriorityID' => $data['priority'],
            'primarySpecialtyID' => $data['primarySpecialty'],
            'primaryOperationID' => $data['primaryOperation'],
            'pOthers' => $data['primaryOthers'],
            'secondarySpecialtyID' => $data['secondarySpecialty'],
            'secondaryOperationID' => $data['secondaryOperation'],
            'sOthers' => $data['secondaryOthers'],
            'supervisionID' => $data['supervision'],
            'supervisorRoleID' => $data['supervisor'],
            'teachingID' => $data['teaching'],
            'modeOfAnesthesiaID' => $data['mode'],
            'significantEvent' => $data['significant'],
            'residentID' => auth()->user()->id,
            'supervisorID' => $Resident->supervisor_id,
        ]);
        if ($data['regionalQuestion'] == true) {
            RegionalAnesthesia::create([
                'anestheticCaseID' => $case->id,
                'regionalProcedureID' => $data['regionalType'],
                'techniqueID' => $data['regionalTechnique'],
                'catheter' => $data['regionalCatheter'],
                'supervisionID' => $data['regionalSupervision'],
                'notes' => $data['regionalNotes'],
            ]);
        }
        if ($data['procedureQuestion'] == true) {
            $categories = $data['procedureCategory'];
            for ($i = 0; $i < count($data['procedureCategory']); $i++) {
                AnestheticSkill::create([
                    'anestheticCaseID' => $case->id,
                    'coreSkillID' => $data['procedureID'],
                    'coreSkillCategoryID' => $categories[$i]
                ]);
            }
        }
        return response()->json(['message' => 'Case successfully submitted'], 200);
    }

    public function intensiveSubmit(Request $request)
    {
        $Validator = $this->validateIntensive($request->all());
        if ($Validator != null) {
            return response()->json($Validator, 400);
        }
        $Resident = Resident::where('id', auth()->user()->id)->first();
        $data = $this->getIntensiveData($request->all());
        $case = Intensive::create([
            'date' => $data['date'],
            'timeslotID' => $data['timeslot'],
            'gender' => $data['gender'],
            'age' => $data['age'],
            'ageUnitID' => $data['ageUnit'],
            'ageCategoryID' => $data['ageCategory'],
            'facilityID' => $data['facility'],
            'icuPrimarySpecialtyID' => $data['specialty'],
            'supervisionID' => $data['supervision'],
            'supervisorRoleID' => $data['supervisor'],
            'teachingID' => $data['teaching'],
            'notes' => $data['notes'],
            'eventID' => $data['event'],
            'numberOfOrganSupport' => $data['organ'],
            'primaryDiagnosis' => $data['diagnosis'],
            'comorbidities' => $data['morbidities'],
            'residentID' => auth()->user()->id,
            'supervisorID' => $Resident->supervisor_id,
        ]);
        $categories = $data['procedureCategory'];
        for ($i = 0; $i < count($data['procedureCategory']); $i++) {
            IntensiveSkill::create([
                'intensiveCaseID' => $case->id,
                'coreSkillID' => $data['procedureID'],
                'coreSkillCategoryID' => $categories[$i]
            ]);
        }
        $categories = $data['supportCategory'];
        for ($i = 0; $i < count($data['supportCategory']); $i++) {
            IntensiveSupport::create([
                'intensiveCaseID' => $case->id,
                'supportID' => $data['supportID'],
                'supportCategoryID' => $categories[$i]
            ]);
        }
        return response()->json(['message' => 'Case successfully submitted'], 200);
    }

    public function procedureSubmit(Request $request)
    {
        $Validator = $this->validateProcedure($request->all());
        if ($Validator != null) {
            return response()->json($Validator, 400);
        }
        $Resident = Resident::where('id', auth()->user()->id)->first();
        $data = $this->getProcedureData($request->all());
        $case = Procedure::create([
            'date' => $data['date'],
            'timeslotID' => $data['timeslot'],
            'gender' => $data['gender'],
            'facilityID' => $data['facility'],
            'age' => $data['age'],
            'ageUnitID' => $data['ageUnit'],
            'ageCategoryID' => $data['ageCategory'],
            'procedureSpecialtyID' => $data['specialty'],
            'others' => $data['other'],
            'supervisionID' => $data['supervision'],
            'supervisorRoleID' => $data['supervisor'],
            'notes' => $data['notes'],
            'residentID' => auth()->user()->id,
            'supervisorID' => $Resident->supervisor_id,
        ]);
        $categories = $data['procedureCategory'];
        for ($i = 0; $i < count($data['procedureCategory']); $i++) {
            ProcedureSkill::create([
                'procedureCaseID' => $case->id,
                'coreSkillID' => $data['procedureID'],
                'coreSkillCategoryID' => $categories[$i]
            ]);
        }
        return response()->json(['message' => 'Case successfully submitted'], 200);
    }
}
