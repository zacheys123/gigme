import SocialMainPage from "@/components/SocialMainPage";
import LeftBar from "@/components/socials/LeftBar";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { Box } from "@mui/material";

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
    const res = await fetch(`${checkEnvironment()}/api/posts/getallPosts`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
const SocialPage = async () => {
  const userdata = getUser();
  const postsdata = getPosts();
  const [user, posts] = await Promise.all([userdata, postsdata]);

  console.log(posts);
  return (
    <div className="w-screen h-screen  bg-gray-600">
      {" "}
      <SocialMainPage user={user} posts={posts} />{" "}
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
