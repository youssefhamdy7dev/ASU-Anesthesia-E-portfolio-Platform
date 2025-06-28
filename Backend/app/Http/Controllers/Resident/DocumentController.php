<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Models\Data\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function addDoc(Request $request)
    {
        if (!$request->hasFile('file'))
            return response()->json(['message' => 'You did not choose file'], 400);
        $completeFileName = $request->file('file')->getClientOriginalName();
        $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
        $extension = $request->file('file')->getClientOriginalExtension();
        $file = str_replace(' ', '_', $fileNameOnly) . '_' . rand() . time() . '.' . $extension;
        if ($extension == "pdf" || $extension == "docx" || $extension == "doc") {
            $request->file('file')->storeAs('public/documents', $file);
            Document::create([
                'document' => $file,
                'residentID' => auth()->user()->id
            ]);
            return response()->json(['message' => 'File was uploaded successfully!']);
        }
        return response()->json(['message' => 'ERROR! invalid file type. (Upload PDF or WordDocument)'], 400);
    }
    public function deleteDoc(Request $request)
    {
        $doc = Document::where('id', $request->id)->first();
        unlink(public_path('storage/documents/' . $doc->document));
        Document::where('id', $request->id)->delete();
        return response()->json(['message' => 'File was deleted successfully!']);
    }
    public function viewDocs()
    {
        $documents = Document::where('residentID', auth()->user()->id)->select('id', 'document')->get();
        return response()->json($documents);
    }
    public function downloadDoc(Request $request)
    {
        $doc = Document::where('id', $request->id)->first();
        return response()->download(public_path('storage/documents/' . $doc->document));
    }
}
