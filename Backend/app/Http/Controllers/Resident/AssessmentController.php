<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Models\Data\Assessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
{
    public function addAssessment(Request $request)
    {
        $description = "";
        if (!$request->hasFile('file'))
            return response()->json(['message' => 'You did not choose file'], 400);
        if (!$request->has('clinical') || !$request->has('category')) {
            return response()->json(['message' => 'Please fill data.'], 400);
        }
        if ($request->category == null || $request->category == "null")
            return response()->json(['message' => 'Please fill data.'], 400);
        $validator = Validator::make($request->all(), [
            'clinical' => 'required',
            'category' => 'required'
        ], [
            'clinical.required' => 'Please choose your clinical supervisor.',
            'category.required' => 'Please choose a category.'
        ]);
        if ($validator->fails())
            return response()->json($validator->errors(), 400);
        if ($request->has('description')) {
            $description = $request->description;
            if ($request->description == "null" || $request->description == null) {
                $description = "";
            }
        }
        $completeFileName = $request->file('file')->getClientOriginalName();
        $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
        $extension = $request->file('file')->getClientOriginalExtension();
        $file = str_replace(' ', '_', $fileNameOnly) . '_' . rand() . time() . '.' . $extension;
        if ($extension == "pdf" || $extension == "docx" || $extension == "doc") {
            Assessment::create([
                'assessment' => $file,
                'category' => $request->category,
                'description' => $description,
                'clinicalID' => $request->clinical,
                'residentID' => auth()->user()->id
            ]);
            $request->file('file')->storeAs('public/assessments', $file);
            return response()->json(['message' => 'File was uploaded successfully!']);
        }
        return response()->json(['message' => 'ERROR! invalid file type. (Upload PDF or WordAssessment)'], 400);
    }
    public function deleteAssessment(Request $request)
    {
        $a = Assessment::where('id', $request->id)->first();
        unlink(public_path('storage/assessments/' . $a->assessment));
        Assessment::where('id', $request->id)->delete();
        return response()->json(['message' => 'File was deleted successfully!']);
    }
    public function viewAssessments()
    {
        $assessments = Assessment::where('residentID', auth()->user()->id)->where('pending', 0)->get();
        return response()->json($assessments);
    }
    public function downloadAssessment(Request $request)
    {
        $a = Assessment::where('id', $request->id)->first();
        return response()->download(public_path('storage/assessments/' . $a->assessment));
    }
}
