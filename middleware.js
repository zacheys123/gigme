import { NextResponse } from "next/server";
// import useUserId from "@auth0/nextjs-auth0"
import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/user/getuser/:id",
    "/api/posts/getPosts",
    "/api/comments/getComments",
  ],
});
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/friends/:search",
  ],
};
