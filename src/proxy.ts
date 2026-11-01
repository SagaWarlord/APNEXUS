import { NextResponse, type NextRequest } from "next/server";

// Next.js 16: proxy.ts replaces middleware.ts
// Supabase auth check is deferred until Supabase is configured
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/admin", "/judge"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  // When Supabase is configured, add auth checks here.
  // For now, redirect unauthenticated protected-route hits to /login.
  // (Full Supabase session checking is wired in Phase 4.)
  if (isProtected) {
    // Placeholder — allow all through during development
    // Replace with real session check once env vars are set
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
