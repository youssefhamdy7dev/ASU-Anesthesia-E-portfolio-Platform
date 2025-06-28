<?php

namespace App\Http\Controllers;

use App\Models\Data\Assessment;
use App\Models\Logbook\Anesthetic;
use App\Models\Logbook\Intensive;
use App\Models\Logbook\Procedure;
use App\Models\Users\Resident;
use App\Models\Users\Supervisor;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function Regist()
    {
        $mailData = [
            'recipient' => 'youssefhamdy.joe7@gmail.com',
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'New Account Registration!',
        ];
        Mail::send('Emails.account-submit', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function AccountAccept($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Congratulations! Your Account has been Accepted!',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.account-accept', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function AccountReject($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Account Registration Status - Rejected',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.account-reject', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function Rotation()
    {
        $mailData = [
            'recipient' => 'youssefhamdy.joe7@gmail.com',
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'New Rotation Added!',
        ];
        Mail::send('Emails.rotation-submit', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function RotationAccept($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Rotation Accepted - Congratulations!',
            'body' => $Resident->name
        ];
        Mail::send('Emails.rotation-accept', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function RotationReject()
    {
        $Resident = Resident::where('id', 1)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Rotation Rejected',
            'body' => $Resident->name
        ];
        Mail::send('Emails.rotation-reject', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function Case($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $Supervisor = Supervisor::where('id', $Resident->supervisor_id)->first();
        $mailData = [
            'recipient' => $Supervisor->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'New Case Submission - Pending Confirmation',
            'body' => $Supervisor->name,
        ];
        Mail::send('Emails.case-submit', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function CaseAccept($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Case Accepted - Congratulations!',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.case-accept', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function CaseReject($ResidentID)
    {
        $Resident = Resident::where('NID', $ResidentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Case Rejected - Feedback and Next Steps',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.case-reject', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function Assessment($id)
    {
        $Assesment = Assessment::where('id', $id)->first();
        $Supervisor = Supervisor::where('id', $Assesment->clinicalID)->first();
        $mailData = [
            'recipient' => $Supervisor->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'New Assessment Uploaded - Action Required',
            'body' => $Supervisor->name,
        ];
        Mail::send('Emails.assessment-submit', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function AssessmentAccept($id)
    {
        $Assesment = Assessment::where('id', $id)->first();
        $Resident = Resident::where('id', $Assesment->residentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Assessment Accepted - Congratulations!',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.assessment-accept', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function AssessmentReject($id)
    {
        $Assesment = Assessment::where('id', $id)->first();
        $Resident = Resident::where('id', $Assesment->residentID)->first();
        $mailData = [
            'recipient' => $Resident->email,
            'fromEmail' => 'youssefhamdy.joe7@gmail.com',
            'fromName' => 'ASU Anesthesia E-Portfolio',
            'subject' => 'Assessment Rejected - Feedback and Next Steps',
            'body' => $Resident->name,
        ];
        Mail::send('Emails.case-reject', $mailData, function ($message) use ($mailData) {
            $message->to($mailData['recipient'])
                ->from($mailData['fromEmail'], $mailData['fromName'])
                ->subject($mailData['subject']);
        });
    }

    public function LazySupervisor()
    {
        $Supervisors = Supervisor::get();
        foreach ($Supervisors as $Supervisor) {
            $anesthetic = Anesthetic::where('supervisorID', $Supervisor->id)->get();
            $intensive = Intensive::where('supervisorID', $Supervisor->id)->get();
            $procedure = Procedure::where('supervisorID', $Supervisor->id)->get();
            $totalCases = count($anesthetic) + count($intensive) + count($procedure);
            if ($totalCases >= 5) {
                $mailData = [
                    'recipient' => 'youssefhamdy.joe7@gmail.com',
                    'fromEmail' => 'youssefhamdy.joe7@gmail.com',
                    'fromName' => 'ASU Anesthesia E-Portfolio',
                    'subject' => 'Urgent: Supervisor Inactivity Notification',
                    'body' => $Supervisor->email,
                    'name' => $Supervisor->name,
                    'totalCases' => $totalCases,
                ];
                Mail::send('Emails.lazy-supervisor', $mailData, function ($message) use ($mailData) {
                    $message->to($mailData['recipient'])
                        ->from($mailData['fromEmail'], $mailData['fromName'])
                        ->subject($mailData['subject']);
                });
            }
        }
    }
}
