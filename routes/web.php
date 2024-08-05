<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SurveyResponseController;
use App\Http\Controllers\ParticipationController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('surveys', [SurveyController::class, 'showUserSurveys'])->name('surveys');
    Route::get('/surveys/{survey}/participate', [SurveyController::class, 'participate'])->name('surveys.participate');
    Route::post('/surveys/{survey}/submit', [SurveyController::class, 'submit'])->name('surveys.submit');
    Route::get('/history', [SurveyController::class, 'userHistory'])->name('history');
    Route::get('/surveys/{id}', [SurveyController::class, 'show'])->name('surveys.show');
    Route::get('/surveys/{id}/responses', [SurveyController::class, 'showResponses'])->name('surveys.responses');
    Route::get('/api/surveys/{id}/responses', [SurveyController::class, 'getResponses']);


});



require __DIR__.'/auth.php';
require __DIR__.'/admin-auth.php';