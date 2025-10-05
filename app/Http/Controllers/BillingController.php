<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;

class BillingController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('settings/billing', [
            'hasPaymentMethod' => auth()->user()->hasPaymentMethod(),
        ]);
    }

    public function checkout(Post $post): RedirectResponse
    {
        // Redirect to Stripe Checkout for a one-time payment
        // You need to create this price in your Stripe Dashboard
        return auth()->user()->checkout('price_post_boost', [
            'success_url' => route('billing.success') . '?session_id={CHECKOUT_SESSION_ID}&post_id=' . $post->id,
            'cancel_url' => route('settings.billing.show'),
            'metadata' => [
                'post_id' => $post->id,
            ],
        ]);
    }

    public function success(Request $request): RedirectResponse
    {
        $sessionId = $request->get('session_id');
        $postId = $request->get('post_id');

        if ($sessionId && $postId) {
            // Retrieve the checkout session from Stripe
            $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

            // Verify payment was successful
            if ($session->payment_status === 'paid') {
                $post = Post::findOrFail($postId);

                // Boost the post for 7 days
                $post->update([
                    'is_boosted' => true,
                    'boosted_at' => now(),
                    'boosted_until' => now()->addDays(7),
                ]);
            }
        }

        return redirect()->route('settings.billing.show')->with('success', 'Post boosted successfully!');
    }

    public function portal(): RedirectResponse
    {
        // Redirect to Stripe's customer billing portal
        return auth()->user()->redirectToBillingPortal(route('settings.billing.show'));
    }
}
