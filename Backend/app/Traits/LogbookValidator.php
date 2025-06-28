<?php

namespace App\Traits;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

trait LogbookValidator
{
    protected function validateAnesthetic($request)
    {
        $errors = new MessageBag();
        $data1 = [
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
        ];
        $ageData = $request['age'];
        $primaryData = $request['primary'];
        $primaryOperationData = $primaryData['operation'];
        $secondaryData = $request['secondary'];
        $secondaryOperationData = $secondaryData['operation'];
        $regionalAnesthesia = $request['regional'];
        $procedure = $request['procedure'];

        $v1 = Validator::make($data1, [
            'date' => 'required',
            'timeslot' => 'required',
            'gender' => 'required',
            'facility' => 'required',
            'class' => 'required',
            'priority' => 'required',
            'supervision' => 'required',
            'teaching' => 'required',
            'mode' => 'required',
        ], [
            'date.required' => 'Date is required.',
            'timeslot.required' => 'Timeslot is required.',
            'gender.required' => 'Gender is required.',
            'facility.required' => 'Facility is required.',
            'class.required' => 'ASAPS Classification is required.',
            'priority.required' => 'Case priority is required.',
            'supervision.required' => 'Supervision is required.',
            'teaching.required' => 'Teaching choice is required.',
            'mode.required' => 'Mode of anesthesia is required.',
        ]);
        if ($v1->fails()) {
            $errors->merge($v1->errors());
        }
        if ($data1['supervision'] != 4) {
            $tmp = Validator::make($data1, ['supervisor' => 'required'], ['supervisor.required' => 'Supervisor role is required.']);
            if ($tmp->fails()) {
                $errors->merge($tmp->errors());
            }
        }
        $v2 = Validator::make([
            'age' => $ageData['id'],
            'unit' => $ageData['unit'],
            'category' => $ageData['category']
        ], [
            'age' => 'required|max:2|min:1',
            'category' => 'required',
            'unit' => 'required',
        ], [
            'age.required' => 'Age is required.',
            'age.max' => 'Age is invalid',
            'age.min' => 'Age is invalid',
            'category.required' => 'Age category is required.',
            'unit.required' => 'Age unit is required.'
        ]);
        if ($v2->fails()) {
            $errors->merge($v2->errors());
        }
        $v3 = Validator::make(['primarySpecialty' => $primaryData['specialty']], ['primarySpecialty' => 'required'], ['primarySpecialty.required' => 'Primary specialty is required.']);
        if ($v3->fails()) {
            $errors->merge($v3->errors());
        }
        $v4 = Validator::make(['primaryOp' => $primaryOperationData['id']], ['primaryOp' => 'required'], ['primaryOp.required' => 'Operation is required.']);
        if ($v4->fails()) {
            $errors->merge($v4->errors());
        }

        $checkSecondarySpecialty = $secondaryData['present'];
        if ($checkSecondarySpecialty == true) {
            $tmp1 = Validator::make(['secondarySpecialty' => $secondaryData['specialty']], ['secondarySpecialty' => 'required'], ['secondarySpecialty.required' => 'Secondary specialty is required']);
            if ($tmp1->fails()) {
                $errors->merge($tmp1->errors());
            }

            $tmp2 = Validator::make(['secondaryOp' => $secondaryOperationData['id']], ['secondaryOp' => 'required'], ['secondaryOp.required' => 'Operation is required.']);
            if ($tmp2->fails()) {
                $errors->merge($tmp2->errors());
            }
        }
        if ($regionalAnesthesia['status'] == true) {
            $tmp3 = Validator::make([
                'regType' => $regionalAnesthesia['type'],
                'regTech' => $regionalAnesthesia['technique'],
                'catheter' => $regionalAnesthesia['catheter'],
                'regSupervision' => $regionalAnesthesia['supervision'],
            ], [
                'regType' => 'required',
                'regTech' => 'required',
                'catheter' => 'required',
                'regSupervision' => 'required'
            ], [
                'regType.required' => 'Regional type is required.',
                'regTech.required' => 'Technique choice is required.',
                'catheter.required' => 'Please answer with yes or no.',
                'regSupervision.required' => 'Supervision is required.'
            ]);
            if ($tmp3->fails()) {
                $errors->merge($tmp3->errors());
            }
        }
        if ($procedure['status'] == true) {
            $tmp4 = Validator::make([
                'skillID' => $procedure['id'],
                'skillCategory' => $procedure['category']
            ], [
                'skillID' => 'required',
                'skillCategory' => 'required'
            ], [
                'skillID.required' => 'Procedure is required.',
                'skillCategory.required' => 'Category is required.'
            ]);
            if ($tmp4->fails()) {
                $errors->merge($tmp4->errors());
            }
        }
        if (count($errors) == 0) {
            return null;
        }
        return $errors;
    }

    protected function validateIntensive($request)
    {
        $errors = new MessageBag();
        $data1 = [
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
        $ageData = $request['age'];
        $procedure = $request['procedure'];
        $support = $request['support'];
        $v1 = Validator::make($data1, [
            'date' => 'required',
            'timeslot' => 'required',
            'gender' => 'required',
            'facility' => 'required',
            'supervision' => 'required',
            'teaching' => 'required',
            'notes' => 'required',
            'event' => 'required',
            'organ' => 'required',
            'diagnosis' => 'required',
            'morbidities' => 'required',
            'specialty' => 'required'
        ], [
            'date.required' => 'Date is required.',
            'timeslot.required' => 'Time is required.',
            'gender.required' => 'Gender is required.',
            'facility.required' => 'Facility is required.',
            'supervision.required' => 'Supervision is required.',
            'teaching.required' => 'Teaching is required.',
            'notes.required' => 'Notes are required.',
            'event.required' => 'Event is required.',
            'organ.required' => 'Please select a number.',
            'diagnosis.required' => 'Please fill this field.',
            'morbidities.required' => 'Please fill this field.',
            'specialty.required' => 'Specialty is required.'
        ]);
        if ($data1['supervision'] != 4) {
            $tmp = Validator::make($data1, ['supervisor' => 'required'], ['supervisor.required' => 'Supervisor role is required.']);
            if ($tmp->fails()) {
                $errors->merge($tmp->errors());
            }
        }
        if ($v1->fails()) {
            $errors->merge($v1->errors());
        }
        $v2 = Validator::make([
            'age' => $ageData['id'],
            'unit' => $ageData['unit'],
            'category' => $ageData['category']
        ], [
            'age' => 'required|max:2|min:1',
            'category' => 'required',
            'unit' => 'required',
        ], [
            'age.required' => 'Age is required.',
            'age.max' => 'Age is invalid',
            'age.min' => 'Age is invalid',
            'category.required' => 'Age category is required.',
            'unit.required' => 'Age unit is required.'
        ]);
        if ($v2->fails()) {
            $errors->merge($v2->errors());
        }
        $v3 = Validator::make([
            'skillID' => $procedure['id'],
            'skillCategory' => $procedure['category']
        ], [
            'skillID' => 'required',
            'skillCategory' => 'required'
        ], [
            'skillID.required' => 'Procedure is required.',
            'skillCategory.required' => 'Category is required.'
        ]);
        if ($v3->fails()) {
            $errors->merge($v3->errors());
        }
        $v4 = Validator::make([
            'supportID' => $support['id'],
            'supportCategory' => $support['category']
        ], [
            'supportID' => 'required',
            'supportCategory' => 'required'
        ], [
            'supportID.required' => 'Support is required.',
            'supportCategory.required' => 'Category is required.'
        ]);
        if ($v4->fails()) {
            $errors->merge($v4->errors());
        }
        if (count($errors) == 0) {
            return null;
        }
        return $errors;
    }

    protected function validateProcedure($request)
    {
        $errors = new MessageBag();
        $data1 = [
            'date' => $request['date'],
            'timeslot' => $request['timeSlot'],
            'gender' => $request['gender'],
            'facility' => $request['facility'],
            'supervision' => $request['supervision'],
            'supervisor' => $request['supervisor'],
        ];
        $specialty = $request['specialty'];
        $ageData = $request['age'];
        $procedure = $request['procedure'];

        $v1 = Validator::make($data1, [
            'date' => 'required',
            'timeslot' => 'required',
            'gender' => 'required',
            'facility' => 'required',
            'supervision' => 'required',
        ], [
            'date.required' => 'Date is required.',
            'timeslot.required' => 'Timeslot is required.',
            'gender.required' => 'Gender is required.',
            'facility.required' => 'Facility is required.',
            'supervision.required' => 'Supervision is required.',
        ]);
        if ($v1->fails()) {
            $errors->merge($v1->errors());
        }
        if ($data1['supervision'] != 4) {
            $tmp = Validator::make($data1, ['supervisor' => 'required'], ['supervisor.required' => 'Supervisor role is required.']);
            if ($tmp->fails()) {
                $errors->merge($tmp->errors());
            }
        }
        $v2 = Validator::make([
            'age' => $ageData['id'],
            'unit' => $ageData['unit'],
            'category' => $ageData['category']
        ], [
            'age' => 'required|max:2|min:1',
            'category' => 'required',
            'unit' => 'required',
        ], [
            'age.required' => 'Age is required.',
            'age.max' => 'Age is invalid',
            'age.min' => 'Age is invalid',
            'category.required' => 'Age category is required.',
            'unit.required' => 'Age unit is required.'
        ]);
        if ($v2->fails()) {
            $errors->merge($v2->errors());
        }
        $v3 = Validator::make([
            'skillID' => $procedure['id'],
            'skillCategory' => $procedure['category']
        ], [
            'skillID' => 'required',
            'skillCategory' => 'required'
        ], [
            'skillID.required' => 'Procedure is required.',
            'skillCategory.required' => 'Category is required.'
        ]);
        if ($v3->fails()) {
            $errors->merge($v3->errors());
        }
        $v4 = Validator::make(['specialty' => $specialty['id']], ['specialty' => 'required'], ['specialty.required' => 'Specialty is required.']);
        if ($v4->fails()) {
            $errors->merge($v4->errors());
        }
        if (count($errors) == 0) {
            return null;
        }
        return $errors;
    }
}
