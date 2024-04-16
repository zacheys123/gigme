import { NextResponse } from "next/server";
// import useUser from "@auth0/nextjs-auth0"
import { currentUser } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["api/webhook"],
  // const user = request.cookies.get("appSession");
  // if (!user) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // return NextResponse.next();});
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
