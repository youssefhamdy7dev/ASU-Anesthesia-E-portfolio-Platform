<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Data\AgeCategory;
use App\Models\Data\AgeUnit;
use App\Models\Data\AnesthesiaMode;
use App\Models\Data\AsapsClassification;
use App\Models\Data\CasePriority;
use App\Models\Data\CoreSkill;
use App\Models\Data\CoreSkillCategory;
use App\Models\Data\Event;
use App\Models\Data\Facility;
use App\Models\Data\Icu;
use App\Models\Data\IcuPrimarySpecialty;
use App\Models\Data\Operation;
use App\Models\Data\ProcedureSpecialty;
use App\Models\Data\RegionalProcedure;
use App\Models\Data\Specialty;
use App\Models\Data\Supervision;
use App\Models\Data\SupervisorRole;
use App\Models\Data\SupportType;
use App\Models\Data\SupportTypeCategory;
use App\Models\Data\Teaching;
use App\Models\Data\Technique;
use App\Models\Data\Timeslot;
use App\Models\Logbook\Anesthetic;
use App\Models\Logbook\Intensive;
use App\Models\Logbook\Procedure;
use App\Models\Logbook\RegionalAnesthesia;
use App\Models\Logbook\Rotation;
use App\Models\Pivots\AnestheticSkill;
use App\Models\Pivots\IntensiveSkill;
use App\Models\Pivots\IntensiveSupport;
use App\Models\Pivots\ProcedureSkill;
use App\Models\Users\Resident;
use App\Models\Users\Supervisor;
use Illuminate\Support\Facades\Config;

class CasesController extends Controller
{
    public function __construct()
    {
        Config::set('auth.defaults.guard', 'adminApi');
    }

    public function pendingCaseAnesthetic()
    {
        $data = [];
        $anestheticCase = Anesthetic::where('pending', 1)->where('supervisorID', auth()->user()->id)->get();
        if (count($anestheticCase) <= 0) {
            return response()->json(['message' => 'No pending cases.']);
        }
        for ($i = 0; $i < count($anestheticCase); $i++) {
            $fullCaseData = [];
            $anestheticSkill = [];
            $regional = [];
            $mixeddata = [];
            $timeslot = Timeslot::where('id', $anestheticCase[$i]->timeslotID)->get();
            $facility = Facility::where('id', $anestheticCase[$i]->facilityID)->get();
            $ageUnit = AgeUnit::where('id', $anestheticCase[$i]->ageUnitID)->get();
            $ageCategory = AgeCategory::where('id', $anestheticCase[$i]->ageCategoryID)->get();
            $asapsClass = AsapsClassification::where('id', $anestheticCase[$i]->asapsClassID)->get();
            $casePriority = CasePriority::where('id', $anestheticCase[$i]->casePriorityID)->get();
            $primarySpecialty = Specialty::where('id', $anestheticCase[$i]->primarySpecialtyID)->get();
            $primaryOperation = Operation::where('id', $anestheticCase[$i]->primaryOperationID)->get();
            $supervision = Supervision::where('id', $anestheticCase[$i]->supervisionID)->get();
            if ($anestheticCase[$i]->supervisorRoleID != null && $anestheticCase[$i]->supervisorRoleID != []) {
                $supervisorRole = SupervisorRole::where('id', $anestheticCase[$i]->supervisorRoleID)->get();
            }
            $regional_anesthesia = RegionalAnesthesia::where('anestheticCaseID', $anestheticCase[$i]->id)->get();
            if (count($regional_anesthesia) != 0 && $regional_anesthesia != []) {
                $regionalProc = RegionalProcedure::where('id', $regional_anesthesia[0]->regionalProcedureID)->get();
                $supervision = Supervision::where('id', $regional_anesthesia[0]->supervisionID)->get();
                $technique = Technique::where('id', $regional_anesthesia[0]->techniqueID)->get();
                $regional = [
                    'regionalProcedure' => $regionalProc[0]->procedure,
                    'technique' => $technique[0]->tech,
                    'catheter' => $regional_anesthesia[0]->catheter,
                    'supervision' => $supervision[0]->name,
                    'notes' => $regional_anesthesia[0]->notes,
                ];
            }
            $anestheticSkills = AnestheticSkill::where('anestheticCaseID', $anestheticCase[$i]->id)->get();
            if (count($anestheticSkills) != 0 && $anestheticSkills != []) {
                $categories = [];
                $skill = CoreSkill::where('id', $anestheticSkills[0]->coreSkillID)->get();
                for ($j = 0; $j < count($anestheticSkills); $j++) {
                    $category = CoreSkillCategory::where('id', $anestheticSkills[$j]->coreSkillCategoryID)->get();
                    array_push($categories, $category[0]->category);
                }
                $anestheticSkill = [
                    'Skill' => $skill[0]->skill,
                    'Category' => $categories,
                ];
            }
            $teaching = Teaching::where('id', $anestheticCase[$i]->teachingID)->get();
            $modeOfAnesthesia = AnesthesiaMode::where('id', $anestheticCase[$i]->modeOfAnesthesiaID)->get();
            $ac = [
                'id' => $anestheticCase[$i]->id,
                'date' => $anestheticCase[$i]->date,
                'timeSlot' => $timeslot[0]->details,
                'facility' => $facility[0]->name,
                'gender' => $anestheticCase[$i]->gender,
                'age' => $anestheticCase[$i]->age,
                'ageUnit' => $ageUnit[0]->unit,
                'ageCategory' => $ageCategory[0]->category,
                'class' => $asapsClass[0]->class,
                'casePriority' => $casePriority[0]->priority,
                'primarySpecialty' => $primarySpecialty[0]->specialty,
                'primaryOperation' => $primaryOperation[0]->title,
                'pOthers' => $anestheticCase[$i]->pOthers,
                'supervision' => $supervision[0]->name,
                'significant' => $anestheticCase[$i]->significantEvent,
                'teaching' => $teaching[0]->title,
                'mode' => $modeOfAnesthesia[0]->mode,
                'creationDate' => $anestheticCase[$i]->caseCreationDate
            ];
            if ($anestheticCase[$i]->supervisorRoleID != null) {
                $ac = array_merge($ac, ['supervisorRole' => $supervisorRole[0]->role]);
            } else {
                $ac = array_merge($ac, ['supervisorRole' => null]);
            }
            $mixeddata = array_merge($ac);
            if ($anestheticCase[$i]->secondarySpecialtyID != null) {
                $secondarySpecialty = Specialty::where('id', $anestheticCase[$i]->secondarySpecialtyID)->get();
                $secondaryOperation = Operation::where('id', $anestheticCase[$i]->secondaryOperationID)->get();
                $sec = [
                    'secondarySpecialty' => $secondarySpecialty[0]->specialty,
                    'secondaryOperation' => $secondaryOperation[0]->title,
                    'sOthers' => $anestheticCase[$i]->sOthers,
                ];
                $mixeddata = array_merge($ac, $sec);
            }
            $fullCaseData = [
                'AnestheticCase' => $mixeddata,
                'CaseProcedures' => $anestheticSkill,
                'RegionalProcedure' => $regional,
                'Resident' => Resident::where('id', $anestheticCase[$i]->residentID)->first(),
            ];
            array_push($data, $fullCaseData);
        }
        return response()->json($data);
    }
    public function acceptCaseAnesthetic(Request $request)
    {
        $caseID = $request->all()['id'];
        Anesthetic::where('id', $caseID)->update(['pending' => 0]);
        return response()->json(['message' => 'Case was acccepted successfully.']);
    }
    public function rejectCaseAnesthetic(Request $request)
    {
        $caseID = $request->all()['id'];
        Anesthetic::where('id', $caseID)->delete();
        RegionalAnesthesia::where('anestheticCaseID', $caseID)->delete();
        AnestheticSkill::where('anestheticCaseID', $caseID)->delete();
        return response()->json(['message' => 'Case was rejected successfully.']);
    }

    public function pendingCaseIntensive()
    {
        $data = [];
        $intensiveCase = Intensive::where('pending', 1)->where('supervisorID', auth()->user()->id)->get();
        if (count($intensiveCase) <= 0) {
            return response()->json(['message' => 'No pending cases.']);
        }
        for ($i = 0; $i < count($intensiveCase); $i++) {
            $fullCaseData = [];
            $intensiveSkill = [];
            $Support = [];
            $timeslot = Timeslot::where('id', $intensiveCase[$i]->timeslotID)->get();
            $facility = Icu::where('id', $intensiveCase[$i]->facilityID)->get();
            $ageUnit = AgeUnit::where('id', $intensiveCase[$i]->ageUnitID)->get();
            $ageCategory = AgeCategory::where('id', $intensiveCase[$i]->ageCategoryID)->get();
            $supervision = Supervision::where('id', $intensiveCase[$i]->supervisionID)->get();
            $event = Event::where('id', $intensiveCase[$i]->eventID)->get();
            $icuSpecialty = IcuPrimarySpecialty::where('id', $intensiveCase[$i]->icuPrimarySpecialtyID)->get();
            if ($intensiveCase[$i]->supervisorRoleID != null && $intensiveCase[$i]->supervisorRoleID != []) {
                $supervisorRole = SupervisorRole::where('id', $intensiveCase[$i]->supervisorRoleID)->get();
            }

            $intensiveSkills = IntensiveSkill::where('intensiveCaseID', $intensiveCase[$i]->id)->get();
            if (count($intensiveSkills) != 0 && $intensiveSkills != []) {
                $categories = [];
                $skill = CoreSkill::where('id', $intensiveSkills[0]->coreSkillID)->get();
                for ($j = 0; $j < count($intensiveSkills); $j++) {
                    $category = CoreSkillCategory::where('id', $intensiveSkills[$j]->coreSkillCategoryID)->get();
                    array_push($categories, $category[0]->category);
                }
                $intensiveSkill = [
                    'Skill' => $skill[0]->skill,
                    'Category' => $categories,
                ];
            }

            $intensiveSupport = IntensiveSupport::where('intensiveCaseID', $intensiveCase[$i]->id)->get();
            if (count($intensiveSupport) != 0 && $intensiveSupport != []) {
                $categories = [];
                $support = SupportType::where('id', $intensiveSupport[0]->supportID)->get();
                for ($j = 0; $j < count($intensiveSupport); $j++) {
                    $category = SupportTypeCategory::where('id', $intensiveSupport[$j]->supportCategoryID)->get();
                    array_push($categories, $category[0]->category);
                }
                $Support = [
                    'Support' => $support[0]->support,
                    'Category' => $categories,
                ];
            }

            $teaching = Teaching::where('id', $intensiveCase[$i]->teachingID)->get();
            $ic = [
                'id' => $intensiveCase[$i]->id,
                'date' => $intensiveCase[$i]->date,
                'timeSlot' => $timeslot[0]->details,
                'facility' => $facility[0]->name,
                'gender' => $intensiveCase[$i]->gender,
                'age' => $intensiveCase[$i]->age,
                'ageUnit' => $ageUnit[0]->unit,
                'ageCategory' => $ageCategory[0]->category,
                'event' => $event[0]->event,
                'icuPrimarySpecialty' => $icuSpecialty[0]->specialty,
                'diagnosis' => $intensiveCase[$i]->primaryDiagnosis,
                'comorbidities' => $intensiveCase[$i]->comorbidities,
                'organ' => $intensiveCase[$i]->numberOfOrganSupport,
                'supervision' => $supervision[0]->name,
                'teaching' => $teaching[0]->title,
                'notes' => $intensiveCase[$i]->notes,
                'creationDate' => $intensiveCase[$i]->caseCreationDate
            ];
            if ($intensiveCase[$i]->supervisorRoleID != null) {
                $ic = array_merge($ic, ['supervisorRole' => $supervisorRole[0]->role]);
            } else {
                $ic = array_merge($ic, ['supervisorRole' => null]);
            }
            $fullCaseData = [
                'IntensiveCase' => $ic,
                'CaseProcedures' => $intensiveSkill,
                'Support' => $Support,
                'Resident' => Resident::where('id', $intensiveCase[$i]->residentID)->first(),
            ];
            array_push($data, $fullCaseData);
        }
        return response()->json($data);
    }
    public function acceptCaseIntensive(Request $request)
    {
        $caseID = $request->all()['id'];
        Intensive::where('id', $caseID)->update(['pending' => 0]);
        return response()->json(['message' => 'Case was acccepted successfully.']);
    }
    public function rejectCaseIntensive(Request $request)
    {
        $caseID = $request->all()['id'];
        Intensive::where('id', $caseID)->delete();
        IntensiveSupport::where('intensiveCaseID', $caseID)->delete();
        IntensiveSkill::where('intensiveCaseID', $caseID)->delete();
        return response()->json(['message' => 'Case was rejected successfully.']);
    }

    public function pendingCaseProcedure()
    {
        $data = [];
        $procedureCase = Procedure::where('pending', 1)->where('supervisorID', auth()->user()->id)->get();
        if (count($procedureCase) <= 0) {
            return response()->json(['message' => 'No pending cases.']);
        }
        for ($i = 0; $i < count($procedureCase); $i++) {
            $fullCaseData = [];
            $procedureSkill = [];
            $timeslot = Timeslot::where('id', $procedureCase[$i]->timeslotID)->get();
            $facility = Facility::where('id', $procedureCase[$i]->facilityID)->get();
            $ageUnit = AgeUnit::where('id', $procedureCase[$i]->ageUnitID)->get();
            $ageCategory = AgeCategory::where('id', $procedureCase[$i]->ageCategoryID)->get();
            $supervision = Supervision::where('id', $procedureCase[$i]->supervisionID)->get();
            $specialty = ProcedureSpecialty::where('id', $procedureCase[$i]->procedureSpecialtyID)->get();
            if ($procedureCase[$i]->supervisorRoleID != null && $procedureCase[$i]->supervisorRoleID != []) {
                $supervisorRole = SupervisorRole::where('id', $procedureCase[$i]->supervisorRoleID)->get();
            }

            $procedureSkills = ProcedureSkill::where('procedureCaseID', $procedureCase[$i]->id)->get();
            if (count($procedureSkills) != 0 && $procedureSkills != []) {
                $categories = [];
                $skill = CoreSkill::where('id', $procedureSkills[0]->coreSkillID)->get();
                for ($j = 0; $j < count($procedureSkills); $j++) {
                    $category = CoreSkillCategory::where('id', $procedureSkills[$j]->coreSkillCategoryID)->get();
                    array_push($categories, $category[0]->category);
                }
                $procedureSkill = [
                    'Skill' => $skill[0]->skill,
                    'Category' => $categories,
                ];
            }

            $pc = [
                'id' => $procedureCase[$i]->id,
                'date' => $procedureCase[$i]->date,
                'timeSlot' => $timeslot[0]->details,
                'facility' => $facility[0]->name,
                'gender' => $procedureCase[$i]->gender,
                'age' => $procedureCase[$i]->age,
                'ageUnit' => $ageUnit[0]->unit,
                'ageCategory' => $ageCategory[0]->category,
                'specialty' => $specialty[0]->specialty,
                'other' => $procedureCase[$i]->others,
                'supervision' => $supervision[0]->name,
                'notes' => $procedureCase[$i]->notes,
                'creationDate' => $procedureCase[$i]->caseCreationDate
            ];
            if ($procedureCase[$i]->supervisorRoleID != null) {
                $pc = array_merge($pc, ['supervisorRole' => $supervisorRole[0]->role]);
            } else {
                $pc = array_merge($pc, ['supervisorRole' => null]);
            }
            $fullCaseData = [
                'ProcedureCase' => $pc,
                'CaseProcedures' => $procedureSkill,
                'Resident' => Resident::where('id', $procedureCase[$i]->residentID)->first(),
            ];
            array_push($data, $fullCaseData);
        }
        return response()->json($data);
    }
    public function acceptCaseProcedure(Request $request)
    {
        $caseID = $request->all()['id'];
        Procedure::where('id', $caseID)->update(['pending' => 0]);
        return response()->json(['message' => 'Case was acccepted successfully.']);
    }
    public function rejectCaseProcedure(Request $request)
    {
        $caseID = $request->all()['id'];
        Procedure::where('id', $caseID)->delete();
        ProcedureSkill::where('procedureCaseID', $caseID)->delete();
        return response()->json(['message' => 'Case was rejected successfully.']);
    }

    public function pendingRotation()
    {
        $rotations = Rotation::where('pending', 1)->get();
        if (count($rotations) == 0) {
            return response()->json(['message' => 'There are no pending rotations.']);
        }
        $data = [];
        for ($i = 0; $i < count($rotations); $i++) {
            $academicSupervisor = Supervisor::where('id', $rotations[$i]->academicSupervisorID)->get();
            $clinicalSupervisor = Supervisor::where('id', $rotations[$i]->clinicalSupervisorID)->get();
            $rotationData = [
                'id' => $rotations[$i]->id,
                'name' => $rotations[$i]->name,
                'startDate' => $rotations[$i]->startDate,
                'endDate' => $rotations[$i]->endDate,
                'year' => $rotations[$i]->stage,
                'academicSupervisor' => $academicSupervisor[0]->name,
                'clinicalSupervsior' => $clinicalSupervisor[0]->name,
                'creationDate' => $rotations[$i]->creationDate
            ];
            $fullData = [
                'Rotation' => $rotationData,
                'Resident' => Resident::where('id', $rotations[$i]->residentID)->first(),
            ];
            array_push($data, $fullData);
        }
        return response()->json($data);
    }
    public function acceptRotation(Request $request)
    {
        $rotation = $request->all()['id'];
        Rotation::where('id', $rotation)->update(['pending' => 0]);
        return response()->json(['message' => 'Rotation was acccepted successfully.']);
    }
    public function rejectRotation(Request $request)
    {
        $rotation = $request->all()['id'];
        Rotation::where('id', $rotation)->delete();
        return response()->json(['message' => 'Rotation was rejected successfully.']);
    }
}
