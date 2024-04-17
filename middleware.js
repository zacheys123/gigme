import { NextResponse } from "next/server";
// import useUserId from "@auth0/nextjs-auth0"
import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";

const authId = () => {
  return authMiddleware(
    (request) => {
      let userId = request.cookies.getAll();
      console.log(userId);
      if (!userId.length < 1) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    },
    {
      publicRoutes: ["api/webhook", "/"],
    }
  );
};
export default authMiddleware(authId());
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
