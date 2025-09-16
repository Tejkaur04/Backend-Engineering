import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/public"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value; //? used for optional

  let isPublic = false;

  publicRoutes.forEach((path) => {
    if (request.nextUrl.pathname.startsWith(path)) {
      isPublic = true;
    }
  });
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url)); //url create krne ke liye
  }
}
export const config = {
  //konse konse routes ke liye nhi chalna (negative routing)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

//positive matching = telling the middleware to run on these routes
// ["/about","/contact"]
