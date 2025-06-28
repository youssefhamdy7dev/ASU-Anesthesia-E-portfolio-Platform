<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Data\Assessment;
use App\Models\Logbook\Anesthetic;
use App\Models\Logbook\Intensive;
use App\Models\Logbook\Procedure;
use App\Models\Logbook\Rotation;
use App\Models\Users\Resident;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct()
    {
        Config::set('auth.defaults.guard', 'adminApi');
    }
    public function cases()
    {
        $ac = Anesthetic::where('supervisorID', auth()->user()->id)->where('pending', 1)->get();
        $ic = Intensive::where('supervisorID', auth()->user()->id)->where('pending', 1)->get();
        $pc = Procedure::where('supervisorID', auth()->user()->id)->where('pending', 1)->get();
        $as = Assessment::where('clinicalID', auth()->user()->id)->where('pending', 1)->get();
        return response()->json(
            [
                'anesthetic' => count($ac),
                'intensive' => count($ic),
                'procedure' => count($pc),
                'assessment' => count($as)
            ]
        );
    }
    public function admins()
    {
        $rot = Rotation::where('pending', 1)->get();
        $accounts = Resident::where('pending', 1)->get();
        return response()->json([
            'rotation' => count($rot),
            'account' => count($accounts)
        ]);
    }
}
