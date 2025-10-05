<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class BillingController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('settings/billing');
    }
}
