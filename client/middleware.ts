import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getUserToken } from './lib/auth';

// 1. Specify protected and public routes
const protectedAdminRoutes = ['/admin'];
const protectedUserRoutes = ['/user'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isAdminRoute = protectedAdminRoutes.some(route => path.startsWith(route)); // Check if path starts with '/admin'
    const isUserRoute = protectedUserRoutes.some(route => path.startsWith(route)); // Check if path starts with '/user'

    // 2. Get the auth tokens for admin and user
    const admin_token = await getAdminAuth();
    // const user_token = await getUserAuth();
    const user_token = await getUserToken()

    // 3. Handle protected admin routes
    if (isAdminRoute && !admin_token) {
        // Redirect to login if admin token is not found
        return NextResponse.redirect(new URL('/login-admin', req.nextUrl));
    }

    // 4. Handle protected user routes
    if (isUserRoute && !user_token) {
        // Redirect to login if user token is not found
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // Continue the request if all conditions are met
    return NextResponse.next();
}