"use client";
import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiBell } from "react-icons/hi";
import { Button } from "../ui/button";
import {
  AddAPhoto,
  ArrowBack,
  Camera,
  Compress,
  Diversity3,
} from "@mui/icons-material";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/store";
import { global } from "@/actions";
import { CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { useCompressVideos } from "@/hooks/useCompressVideos";
import VideoUploadWidget from "../VideoUploadWidget";
import useStore from "@/app/zustand/useStore";
import ProfileComponent from "../userprofile/ProfileComponent";
import { useRouter } from "next/navigation";
const UserPost = ({ users }) => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { videourl, showPosts, setShowPosts } = useStore();

  const baseUrl = "/api/posts/createPost";
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState();
  const [statusmsg, setStatusMessage] = useState();
  const { compressedVideoUrl, loader, compressVideo } = useCompressVideos(file);
  const [postdata, setPostData] = useState({ post: "", description: "" });
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (f) {
      const url = URL.createObjectURL(f);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };
  const router = useRouter();
  const handlePost = async (e) => {
    e.preventDefault();
    console.log(url, postdata.post, postdata.description);

    let dataInfo = {
      media: videourl?.secure_url,
      title: postdata.post,
      description: postdata.description,
      postedBy: user?.user?._id,
    };

    try {
      setLoading(true);
      const res = await fetch(baseUrl, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(dataInfo),
      });

      const data = await res.json();
      console.log(data);
      toast.success(data?.message);
      setPostData({ post: "", description: "" });
      setFileUrl(undefined);
      setFile(undefined);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (otheruser) => {
    router?.push(`/friends/${otheruser?.username}`);
  };
  console.log(videourl?.secure_url);
  return (
    <>
      {!showPosts ? (
        <div className="relative h-[180px]  shadow-xl shadow-slate-500 w-full mx-auto  px-5 mt-4">
          <h6 className="text-neutral-400 title">Musicians you may know</h6>

          <div className="h-full w-[100vw] overflow-x-scroll snap-x snap-mandatory flex justify-center items-center">
            <div className="w-full inline-flex flex-shrink-0 scroll-smooth py-3 ">
              {users
                .filter((userd) => userd?.instrument?.length > 0)
                .map((otheruser) => {
                  return (
                    <ProfileComponent
                      key={otheruser?._id}
                      otheruser={otheruser}
                      user={user}
                      router={router}
                      maindiv=" w-[100px] bg-slate-900 shadow-sm shadow-yellow-500 px-4 rounded-full my-2 ml-3 h-[85px] hover:scale-110 transition-transform duration-75"
                      thirdDiv="w-full flex justify-center  items-center flex-col"
                      image="w-[35px] h-[35px] rounded-full text-center"
                      imageno={25}
                      initial={{ opacity: 0, x: ["15px"] }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 1, delay: 0.1 }}
                      userpost={true}
                      onClick={() => handleClick(otheruser)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <form
          className="h-[800px] shadow-xl shadow-slate-500 w-[90%] mx-auto  mt-8 p-4"
          onSubmit={handlePost}
        >
          <h6 className="text-[15px] text-gray-300 underline text-center">
            Jam Details
          </h6>
          <div className="w-full mt-5">
            {" "}
            <Input
              id="post"
              type="text"
              className=" mt-2 p-2 w-full text-[13px] bg-gray-300 rounded-md focus-within:ring-o outline-none"
              placeholder="Create a Jamtitle...."
              required
              value={postdata?.post}
              onChange={(e) =>
                setPostData((prev) => {
                  return { ...prev, post: e.target.value };
                })
              }
            />
          </div>
          <div className="w-full mt-5">
            <input
              autoComplete="off"
              id="post"
              value={postdata.description}
              type="text"
              placeholder="Jam session description......"
              required
              onChange={(e) =>
                setPostData((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              className="p-2 w-full text-[13px] bg-gray-300 rounded-md focus-within:ring-o outline-none"
            />
          </div>
          <div className="flex justify-between items-center w-full mx-auto mt-4">
            <VideoUploadWidget />

            <ArrowBack
              className="  text-white"
              size="17px"
              sx={{ fontSize: "19px", color: "white" }}
              onClick={() => setShowPosts(false)}
            />
          </div>
          <div className="h-[300px] bg-gray-800 mt-7">
            {videourl?.resource_type === "video" && (
              <div>
                <video
                  className="w-full h-[240px] md:h-[360px]"
                  src={videourl?.secure_url}
                  autoPlay
                  loop
                  muted
                />
              </div>
            )}
          </div>
          <h6 className="my-5 text-[15px] text-orange-800 font-mono font-bold">
            {postdata.description.length > 0 ? `#${postdata.description}` : ""}
          </h6>
          <Button
            variant="primary"
            type="submit"
            className="h-[30px] w-full p-4"
          >
            {!loading ? (
              "Post"
            ) : (
              <CircularProgress
                size="13px"
                sx={{ color: "white", fontBold: "500" }}
                className="bg-orange-700 rounded-tr-full text-[12px]"
              />
            )}
          </Button>
        </form>
      )}
    </>
  );
};

export default UserPost;
