<?php
use App\Http\Controllers\SurveyController;
use Inertia\Inertia;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraphPageController;


// Routes pour les invités (non authentifiés)
Route::middleware('guest:admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

// Routes pour les utilisateurs authentifiés
Route::middleware('auth:admin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->name('dashboard');

    /*Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');*/
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('newsurvey', function () {
        return Inertia::render('admin/NewSurvey');
    })->name('newsurvey');
    
    Route::get('results', function () {
        return Inertia::render('admin/Results');
    })->name('results');


    Route::get('surveys', [SurveyController::class, 'index'])->name('surveys');
    
    Route::post('surveys', [SurveyController::class, 'store'])->name('surveys.store');
    Route::delete('surveys/{survey}', [SurveyController::class, 'destroy'])->name('surveys.destroy');
    Route::get('surveys/{survey}/edit', [SurveyController::class, 'edit'])->name('surveys.edit');
    Route::put('surveys/{survey}', [SurveyController::class, 'update'])->name('surveys.update');


    
    
    Route::get('results/{survey}/results', [SurveyController::class, 'showResults'])->name('surveys.results');
    Route::get('results', [SurveyController::class, 'afficher'])->name('results');


    Route::get('surveys/{survey}/graphs', [SurveyController::class, 'showGraphs'])->name('surveys.graphs');

});

