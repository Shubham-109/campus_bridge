import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/auth/signin", "/auth/signup"],
  afterAuth(auth, req, evt) {
    if (auth.userId && !auth.orgId && req.nextUrl.pathname != "/home") {
      const home = new URL("/home", req.url);
      return NextResponse.redirect(home);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
