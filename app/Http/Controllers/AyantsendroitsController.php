<?php

namespace App\Http\Controllers;

use App\Models\AyantsEndroit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AyantsendroitsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function LAD()
    {
        return Inertia::render("AyantsEndroit/ListedesAyantsDroits");
    }
    public function Badges()
    {
        return Inertia::render("AyantsEndroit/GestiondesBadges");
    }
    public function Qrcode()
    {
        return Inertia::render("AyantsEndroit/Qrcode");
    }
    public function SuiviA()
    {
        return Inertia::render("AyantsEndroit/SuiviAdhesion");
    }
     public function Infos()
    {
        return Inertia::render("AyantsEndroit/InfosPersonel");
    }
     public function Benefices()
    {
        return Inertia::render("AyantsEndroit/Beneficiaires");
    }
     public function Historie()
    {
        return Inertia::render("AyantsEndroit/Historiques");
    }







    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(AyantsEndroit $ayantsEndroit)
    {
        //
    }

    public function edit(AyantsEndroit $ayantsEndroit)
    {
        //
    }

    public function update(Request $request, AyantsEndroit $ayantsEndroit)
    {
        //
    }

    public function destroy(AyantsEndroit $ayantsEndroit)
    {
        //
    }
}
