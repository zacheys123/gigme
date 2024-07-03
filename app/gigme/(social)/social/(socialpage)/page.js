import SocialMainPage from "@/components/SocialMainPage";
import LeftBar from "@/components/socials/LeftBar";
import connectDb from "@/lib/connectDb";
import Post from "@/models/post";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { NextResponse } from "next/server";

import React from "react";

async function getUser() {
  const { userId } = auth();
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getPosts() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/posts/getPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
}
async function getComments() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/comments/getComments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comments = await res.json();

    return comments;
  } catch (error) {
    console.log(error);
  }
}
async function getReplies() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/reply/getReplies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const replies = await res.json();

    return replies;
  } catch (error) {
    console.log(error);
  }
}
const SocialPage = async () => {
  const user = await getUser();
  const posts = await getPosts();
  const comments = await getComments();
  const replies = await getReplies();
  console.log(replies);
  return (
    <div className="w-screen h-screen  bg-gray-900">
      {" "}
      <SocialMainPage
        user={user}
        posts={posts}
        comments={comments}
        replies={replies}
      />
    </div>
  );
};

export default SocialPage;

{
  /*import Albums from './albums'
 
async function getArtist(username) {
  const res = await fetch(`https://api.example.com/artist/${username}`)
  return res.json()
}
 
async function getArtistAlbums(username) {
  const res = await fetch(`https://api.example.com/artist/${username}/albums`)
  return res.json()
}
 
export default async function Page({ params: { username } }) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)
 
  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])
 
  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums}></Albums>
    </>
  )
}*/
}
