<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AccountsController;
use App\Http\Controllers\Admin\AuthAdminController;
use App\Http\Controllers\MoblieApp\MobileController;
use App\Http\Controllers\Resident\AssessmentController;
use App\Http\Controllers\Resident\AuthController;
use App\Http\Controllers\Resident\DocumentController;
use App\Http\Controllers\Resident\LogbookController;
use App\Http\Controllers\Resident\RotationsController;
use App\Http\Controllers\Resident\ViewController;
use App\Http\Controllers\Supervisor\CasesController;
use App\Http\Controllers\Supervisor\NotificationController;
use App\Http\Controllers\Supervisor\SupervisorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

#----------- Authentication API Routes -----------#
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
/* ---------------------------------------------------------------- */

#----------- Display Logbook Data -----------#
Route::get('/shared', [LogbookController::class, 'shared']);
Route::get('/anesthetic', [LogbookController::class, 'anesthetic']);
Route::get('/intensive', [LogbookController::class, 'intensive']);
Route::get('/procedure', [LogbookController::class, 'procedure']);
/* ---------------------------------------------------------------- */

#----------- Save Logbook Data -----------#
Route::post('/anestheticSubmit', [LogbookController::class, 'anestheticSubmit']);
Route::post('/intensiveSubmit', [LogbookController::class, 'intensiveSubmit']);
Route::post('/procedureSubmit', [LogbookController::class, 'procedureSubmit']);
/* ---------------------------------------------------------------- */

#----------- Resident Rotations -----------#
Route::get('/rotations', [RotationsController::class, 'rotation']);
Route::post('/rotationSubmit', [RotationsController::class, 'rotationSubmit']);
/* ---------------------------------------------------------------- */

#----------- Resident API Routes -----------#
Route::get('/viewAnesthetic', [ViewController::class, 'anesthetic']);
Route::get('/viewIntensive', [ViewController::class, 'intensive']);
Route::get('/viewProcedure', [ViewController::class, 'procedure']);
Route::get('/viewRotation', [ViewController::class, 'rotation']);
Route::get('/viewPrint', [ViewController::class, 'print']);

Route::get('/viewDocs', [DocumentController::class, 'viewDocs']);
Route::post('/addDoc', [DocumentController::class, 'addDoc']);
Route::post('/deleteDoc', [DocumentController::class, 'deleteDoc']);
Route::get('/downloadDoc', [DocumentController::class, 'downloadDoc']);

Route::get('/viewAssessments', [AssessmentController::class, 'viewAssessments']);
Route::post('/addAssessment', [AssessmentController::class, 'addAssessment']);
Route::post('/deleteAssessment', [AssessmentController::class, 'deleteAssessment']);
Route::get('/downloadAssessment', [AssessmentController::class, 'downloadAssessment']);
/* ---------------------------------------------------------------- */

#----------- Supervisor API Routes -----------#
Route::get('/residents', [SupervisorController::class, 'residents']);
Route::post('/viewPortfolio', [SupervisorController::class, 'portfolio']);

Route::get('/pendingRotation', [CasesController::class, 'pendingRotation']);
Route::post('/acceptRotation', [CasesController::class, 'acceptRotation']);
Route::post('/rejectRotation', [CasesController::class, 'rejectRotation']);

Route::get('/pendingCaseAnesthetic', [CasesController::class, 'pendingCaseAnesthetic']);
Route::post('/acceptCaseAnesthetic', [CasesController::class, 'acceptCaseAnesthetic']);
Route::post('/rejectCaseAnesthetic', [CasesController::class, 'rejectCaseAnesthetic']);

Route::get('/pendingCaseIntensive', [CasesController::class, 'pendingCaseIntensive']);
Route::post('/acceptCaseIntensive', [CasesController::class, 'acceptCaseIntensive']);
Route::post('/rejectCaseIntensive', [CasesController::class, 'rejectCaseIntensive']);

Route::get('/pendingCaseProcedure', [CasesController::class, 'pendingCaseProcedure']);
Route::post('/acceptCaseProcedure', [CasesController::class, 'acceptCaseProcedure']);
Route::post('/rejectCaseProcedure', [CasesController::class, 'rejectCaseProcedure']);

Route::get('/pendingAssessments', [SupervisorController::class, 'Assessment']);
Route::post('/acceptAssessment', [SupervisorController::class, 'acceptAssessment']);
/* ---------------------------------------------------------------- */

#----------- Admin API Routes -----------#
Route::group(['prefix' => 'admin'], function () {
    Route::post('/login', [AuthAdminController::class, 'login']);
    Route::post('/logout', [AuthAdminController::class, 'logout']);
    Route::get('/info', [AuthAdminController::class, 'info']);
});

Route::get('/pendingAcc', [AccountsController::class, 'pending']);
Route::post('/acceptAcc', [AccountsController::class, 'accept']);
Route::post('/rejectAcc', [AccountsController::class, 'reject']);
Route::get('/accounts', [AccountsController::class, 'accounts']);
Route::post('/create', [AccountsController::class, 'create']);
Route::post('/editAcc', [AccountsController::class, 'edit']);
Route::post('/deleteRes', [AccountsController::class, 'resdelete']);
Route::post('/deleteSup', [AccountsController::class, 'supdelete']);

#----------- Notifications API Routes -----------#
Route::get('/notifyCases', [NotificationController::class, 'cases']);
Route::get('/notifyAdmin', [NotificationController::class, 'admins']);
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
#----------- Mobile App Routes -----------#
Route::group(['prefix' => 'mob'], function () {
    Route::post('anesthetic', [MobileController::class, 'anesthetic']);
    Route::post('intensive', [MobileController::class, 'intensive']);
    Route::post('procedure', [MobileController::class, 'procedure']);
});
/* ---------------------------------------------------------------- */