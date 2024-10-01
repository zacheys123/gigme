"use client";
import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiBell } from "react-icons/hi";
import { Button } from "../ui/button";
import { ArrowBack, Camera, Compress, Diversity3 } from "@mui/icons-material";
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
const UserPost = ({}) => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { videourl } = useStore();
  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
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
  console.log(videourl?.secure_url);
  return (
    <>
      {!showPosts ? (
        <form
          className="h-[140px] bg-gray-600 shadow-xl w-[90%] mx-auto py-5 px-5 mt-4"
          onSubmit={handlePost}
        >
          <div>
            {" "}
            <Input
              id="post"
              type="text"
              className=" mt-2 p-2 w-full text-[13px] bg-gray-300 rounded-md focus-within:ring-o outline-none"
              placeholder="Create a post...."
              required
              value={postdata?.post}
              onChange={(e) =>
                setPostData((prev) => {
                  return { ...prev, post: e.target.value };
                })
              }
            />
          </div>
          <div className="flex h-[80px] justify-between items-center w-full mx-auto -mt-2">
            <Button
              variant="secondary"
              type="button"
              className="h-[30px] w-[80px] p-3"
              onClick={() =>
                setUserState({ type: global.SHOWPOSTS, payload: !showPosts })
              }
            >
              Add more+
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="h-[30px] w-[80px] p-2"
            >
              {!loading ? (
                "Post"
              ) : (
                <CircularProgress
                  size="13px"
                  sx={{ color: "white", fontBold: "500" }}
                  className="bg-white rounded-tr-full text-[12px]"
                />
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="h-[110px] bg-gray-600 shadow-full w-[90%] mx-auto p-3 mt-8">
          <div className="w-full">
            <input
              autoComplete="off"
              id="post"
              value={postdata.description}
              type="text"
              placeholder="Write something ,image description......"
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
              onClick={() =>
                setUserState({ type: global.SHOWPOSTS, payload: !showPosts })
              }
            />
          </div>
          <div className="h-fit bg-gray-200 mt-7">
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
          <h6 className="mt-3 text-[15px] text-white font-mono font-bold">
            #{postdata.description}
          </h6>
        </div>
      )}
    </>
  );
};

export default UserPost;
