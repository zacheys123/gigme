import { NextResponse } from "next/server";
// import useUserId from "@auth0/nextjs-auth0"
import { auth } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/user/getuser/:id",
    "/api/user/getAllusers/:id",
    "/api/posts/getPosts",
    "/api/comments/getComments",
    "/api/comments/getComment/:id",
    "/api/reply/getReplies",
    "/api/gigs/getpub/:id",
    "/api/gigs/getcreated/:id",
    "/api/gigs/allgigs",
    "/api/gigs/getgig/:id",
    "/api/chat/createchat",
    "/api/chat/sendmessage",
    "/api/online",
    "/api/chat/fetchchats/:userid/:id",
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
