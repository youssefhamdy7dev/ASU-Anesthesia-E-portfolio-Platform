<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait LogbookData
{
    protected function getAnestheticData($request)
    {
        $mainData = [
            'date' => $request['date'],
            'timeslot' => $request['timeSlot'],
            'gender' => $request['gender'],
            'facility' => $request['facility'],
            'class' => $request['class'],
            'priority' => $request['priority'],
            'supervision' => $request['supervision'],
            'supervisor' => $request['supervisor'],
            'teaching' => $request['teaching'],
            'mode' => $request['mode'],
            'significant' => $request['significant'],
        ];
        $ageData1 = $request['age'];
        $ageData = [
            'age' => $ageData1['id'],
            'ageUnit' => $ageData1['unit'],
            'ageCategory' => $ageData1['category']
        ];
        $primaryData1 = $request['primary'];
        $primaryOperationData = $primaryData1['operation'];
        $primaryData = [
            'primarySpecialty' => $primaryData1['specialty'],
            'primaryOperation' => $primaryOperationData['id'],
            'primaryOthers' => $primaryOperationData['others']
        ];
        $checkOthers = DB::table('operations')->where('id', $primaryData['primaryOperation'])->get();
        if ($checkOthers[0]->title == 'Others') {
            $primaryData['primaryOthers'] = null;
        }
        $secondaryData1 = $request['secondary'];
        $secondaryOperationData = $secondaryData1['operation'];
        if ($secondaryData1['present'] == true) {
            $secondaryData = [
                'secondarySpecialty' => $secondaryData1['specialty'],
                'secondaryOperation' => $secondaryOperationData['id'],
                'secondaryOthers' => $secondaryOperationData['others']
            ];
        } else {
            $secondaryData = [
                'secondarySpecialty' => null,
                'secondaryOperation' => null,
                'secondaryOthers' => null
            ];
        }
        $regional = $request['regional'];
        $x = 'h';
        if ($regional['catheter'] == 'yes') {
            $x = 'y';
        } else {
            $x = 'n';
        }
        $regionalData = [
            'regionalQuestion' => $regional['status'],
            'regionalType' => $regional['type'],
            'regionalTechnique' => $regional['technique'],
            'regionalCatheter' => $x,
            'regionalSupervision' => $regional['supervision'],
            'regionalNotes' => $regional['notes']
        ];
        $procedure = $request['procedure'];
        $procedureData = [
            'procedureQuestion' => $procedure['status'],
            'procedureID' => $procedure['id'],
            'procedureCategory' => $procedure['category']
        ];
        $data = array_merge($mainData, $ageData, $primaryData, $secondaryData, $regionalData, $procedureData);
        return $data;
    }

    protected function getIntensiveData($request)
    {
        $mainData = [
            'date' => $request['date'],
            'timeslot' => $request['timeSlot'],
            'gender' => $request['gender'],
            'facility' => $request['facility'],
            'supervision' => $request['supervision'],
            'supervisor' => $request['supervisor'],
            'teaching' => $request['teaching'],
            'notes' => $request['notes'],
            'event' => $request['event'],
            'organ' => $request['organ'],
            'diagnosis' => $request['diagnosis'],
            'morbidities' => $request['morbidities'],
            'specialty' => $request['specialty']
        ];
        $ageData1 = $request['age'];
        $ageData = [
            'age' => $ageData1['id'],
            'ageUnit' => $ageData1['unit'],
            'ageCategory' => $ageData1['category']
        ];
        $procedure = $request['procedure'];
        $procedureData = [
            'procedureID' => $procedure['id'],
            'procedureCategory' => $procedure['category']
        ];
        $support = $request['support'];
        $supportData = [
            'supportID' => $support['id'],
            'supportCategory' => $support['category']
        ];
        $data = array_merge($mainData, $ageData, $procedureData, $supportData);
        return $data;
    }

    protected function getProcedureData($request)
    {
        $mainData = [
            'date' => $request['date'],
            'timeslot' => $request['timeSlot'],
            'gender' => $request['gender'],
            'facility' => $request['facility'],
            'supervision' => $request['supervision'],
            'supervisor' => $request['supervisor'],
            'notes' => $request['notes'],
        ];
        $ageData1 = $request['age'];
        $ageData = [
            'age' => $ageData1['id'],
            'ageUnit' => $ageData1['unit'],
            'ageCategory' => $ageData1['category']
        ];
        $specialty = $request['specialty'];
        $specialtyData = [
            'specialty' => $specialty['id'],
            'other' => $specialty['other']
        ];
        $procedure = $request['procedure'];
        $procedureData = [
            'procedureID' => $procedure['id'],
            'procedureCategory' => $procedure['category']
        ];
        if ($specialtyData['specialty'] != 6) {
            $specialtyData['other'] = null;
        }
        $data = array_merge($mainData, $ageData, $procedureData, $specialtyData);
        return $data;
    }
}
