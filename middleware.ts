import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Only guard dashboard routes — public pages never enter this middleware
  // (matcher below is intentionally narrow)

  // Dev escape hatch: BYPASS_AUTH=true skips Supabase entirely
  if (process.env.BYPASS_AUTH === "true") {
    return NextResponse.next({ request });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured (missing or placeholder), redirect to login
  // rather than crashing with MIDDLEWARE_INVOCATION_FAILED
  const supabaseConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("placeholder") &&
    supabaseUrl.startsWith("https://");

  if (!supabaseConfigured) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Supabase is configured — check the session
  try {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    return supabaseResponse;
  } catch {
    // Auth check failed (network error, bad token, etc.)
    // Redirect to login rather than surfacing a 500
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  // Only protect /dashboard routes — never run on public pages or static assets
  matcher: ["/dashboard", "/dashboard/:path*"],
};