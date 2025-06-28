<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->api_password != env('API_PASSWORD', 'PbqNfV0Rcm2pwnwIqG59ANiSGvkfIIeHsYW08ex50')) {
            return response()->json(['message' => 'Unauthenticated.']);
        }
        return $next($request);
    }
}
