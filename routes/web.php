<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ImageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/welcome-images', [ImageController::class, 'getImagesForWelcome'])->name('welcome.images');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/dashboard', [ImageController::class, 'index'])->name('dashboard');
    Route::post('/images', [ImageController::class, 'store'])->name('images.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
