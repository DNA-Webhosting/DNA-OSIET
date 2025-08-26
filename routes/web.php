<?php

use App\Http\Controllers\SocieteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Connexions/login');
})->name('home');


Route::get('/inscrire', function () {
    return Inertia::render('Connexions/register');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/societes', [SocieteController::class, 'index'])->name('societe.index');
Route::get('/societes/suivi', [SocieteController::class, 'suivi'])->name('societe.suivi');
Route::get('/societes/histori', [SocieteController::class, 'histori'])->name('societe.histori');
Route::get('/societes/Paiement', [SocieteController::class, 'Paiement'])->name('societe.Paiement');
Route::get('/societes/alt', [SocieteController::class, 'alt'])->name('societe.alt');









require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
