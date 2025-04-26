<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();
        return inertia('dashboard', [
            'images' => $images,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Ensure the storage/app/public/uploads directory exists
        $uploadsPath = storage_path('app/public/uploads');
        if (!File::exists($uploadsPath)) {
            try {
                File::makeDirectory($uploadsPath, 0755, true);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['error' => 'Unable to create the uploads directory.']);
            }
        }

        // Store the image in the storage/app/public/uploads directory
        $imagePath = $request->file('image')->store('uploads', 'public');

        // Save the file path in the database
        Image::create([
            'filepath' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Image uploaded successfully!');
    }

    public function getImagesForWelcome()
    {
        $images = Image::all();
        return response()->json($images);
    }
}
