import { defineMiddleware } from 'astro:middleware';
import type { MiddlewareNext } from 'astro';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Extract auth data from cookies or localStorage simulation
  const authCookie = context.cookies.get('auth');
  const userRole = authCookie?.json()?.role;

  // Protected routes
  const protectedRoutes = {
    '/DashboardAdmin': 'admin',
    '/DashboardUser': 'user',
    '/Kanban': ['admin', 'user'],
    '/Archivos': ['admin', 'user'],
  };

  // Check if current route is protected
  const isProtected = Object.keys(protectedRoutes).some(route => pathname.startsWith(route));

  if (isProtected) {
    const requiredRole = protectedRoutes[pathname as keyof typeof protectedRoutes];
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    // If no auth or wrong role, redirect to login
    if (!userRole || !allowedRoles.includes(userRole)) {
      return context.redirect('/Login');
    }
  }

  // Allow request to proceed
  return next();
});
