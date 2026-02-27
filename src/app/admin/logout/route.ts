import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Clear the admin cookie
  const cookieStore = await cookies();
  
  // Delete the cookie
  cookieStore.delete({
    name: "admin",
    path: "/",
  });

  // Also set it to empty as a backup
  cookieStore.set("admin", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });

  // Redirect to home page
  const url = new URL("/", request.url);
  const response = NextResponse.redirect(url);
  
  // Clear the cookie in the response headers as well
  response.cookies.set("admin", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  
  return response;
}




