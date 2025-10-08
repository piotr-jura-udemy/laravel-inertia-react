<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class BillingController extends Controller
{
    public function show(): Response
    {
        $user = auth()->user();

        return Inertia::render('settings/billing', [
            'hasPaymentMethod' => $user->hasPaymentMethod(),
            'invoices' => $user->invoices()->map(fn($invoice) => [
                'id' => $invoice->id,
                'date' => $invoice->date()->toFormattedDateString(),
                'total' => $invoice->total(),
                'status' => $invoice->status,
            ]),
        ]);
    }

    public function checkout(Post $post): SymfonyResponse
    {
        // Redirect to Stripe Checkout for a one-time payment
        $checkout = auth()->user()
            ->checkout(config('services.stripe.boost_price'), [
                'success_url' => route('billing.success') . '?session_id={CHECKOUT_SESSION_ID}&post_id=' . $post->id,
                'cancel_url' => route('billing.show'),
                'invoice_creation' => ['enabled' => true],
                'metadata' => [
                    'post_id' => $post->id,
                ],
            ]);

        return Inertia::location($checkout->url);
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

        return redirect()->route('billing.show')->with('success', 'Post boosted successfully!');
    }

    public function portal(): RedirectResponse
    {
        // Redirect to Stripe's customer billing portal
        return auth()->user()->redirectToBillingPortal(route('billing.show'));
    }

    public function downloadInvoice(Request $request, string $invoiceId): SymfonyResponse
    {
        return $request->user()->downloadInvoice($invoiceId);
    }
}
