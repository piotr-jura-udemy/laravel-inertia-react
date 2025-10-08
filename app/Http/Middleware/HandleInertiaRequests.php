<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? UserResource::make($request->user())->resolve()
                    : null,
            ],
            'notifications' => $request->user() ? [
                'data' => $request->user()
                    ->notifications()
                    ->latest()
                    ->limit(20)
                    ->get()
                    ->map(function ($notification) {
                        return [
                            'id' => $notification->id,
                            'type' => $notification->data['type'] ?? 'unknown',
                            'actor' => [
                                'id' => $notification->data['actor_id'] ?? null,
                                'name' => $notification->data['actor_name'] ?? 'Unknown',
                            ],
                            'data' => $notification->data,
                            'read_at' => $notification->read_at?->toISOString(),
                            'created_at' => $notification->created_at->toISOString(),
                        ];
                    })->toArray(),
                'unread_count' => $request->user()->unreadNotifications()->count(),
            ] : null,
        ];
    }
}
