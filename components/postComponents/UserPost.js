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
import { Box, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import { useCompressVideos } from "@/hooks/useCompressVideos";
import VideoUploadWidget from "../VideoUploadWidget";
import useStore from "@/app/zustand/useStore";
import ProfileComponent from "../userprofile/ProfileComponent";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const UserPost = ({ users }) => {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const { showPosts, setShowPosts } = useStore();

  const baseUrl = "/api/posts/createPost";

  const [url, setUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState();
  const [statusmsg, setStatusMessage] = useState();

  const [postdata, setPostData] = useState({ post: "", description: "" });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  // Handle the upload
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // Handle file selection

  const router = useRouter();
  const handlePost = async (e) => {
    e.preventDefault();
    console.log(url, postdata.post, postdata.description);

    let dataInfo = {
      media: videoUrl,
      title: postdata.post,
      description: postdata.description,
      postedBy: user?.user?._id,
    };
    if (videoUrl) {
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
        setShowPosts(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    alert("Please provide all required fields");
  };
  const handleClick = (otheruser) => {
    router?.push(`/friends/${otheruser?.username}`);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }

    if (!file) {
      return;
    }

    // Check for file size (e.g., limit to 60MB)
    const MAX_FILE_SIZE = 60 * 1024 * 1024; // 60MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 50MB.");
      return;
    }

    // Check if the file is a video
    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only video files are allowed.");
      return;
    }

    setError(null); // Reset error
    setIsUploading(true);

    try {
      // Step 1: Get the signed upload URL from your API
      const response = await fetch("/api/posts/sign-upload", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { signature, timestamp, upload_preset, cloud_name } =
        await response.json();

      // Step 2: Upload the video file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("cloud_name", cloud_name);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        alert("Upload successful!");
        console.log(uploadResult); // You can process this result further (e.g., store the URL)
        setVideoUrl(uploadResult.secure_url);

        toast.success("Video uploaded successfully!");
      } else {
        setError("Upload failed, please try again.");
        console.error(uploadResult);
      }
    } catch (error) {
      setError("An error occurred during upload.");
      console.error("An error occurred during upload.", error);
    } finally {
      setIsUploading(false);
    }
  };
  console.log(fileUrl);
  return (
    <>
      {/* {!isUploading && (
        <div className="absolute h-[100vh] w-full bg-gray-400 opacity-20 z-50">
          <CircularProgress size={100} />
        </div>
      )} */}
      {!showPosts ? (
        <Box className="flex flex-col mt-3 p-2 shadow-md shadow-slate-800 -z-[1]">
          <h6 className="text-neutral-400 title">Musicians you may know</h6>
          <div className="flex  overflow-x-auto space-x-4 p-4">
            {users
              .filter((userd) => userd?.instrument?.length > 0)
              .map((otheruser, index) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: ["15px"] }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    key={otheruser?._id}
                    className="min-w-[75px] h-[75px] rounded-full overflow-hidden shadow-lg"
                    onClick={handleClick}
                  >
                    {otheruser?.picture && (
                      <Image
                        height={100}
                        width={100}
                        src={otheruser?.picture}
                        alt={otheruser?.firstname}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                );
              })}
          </div>{" "}
        </Box>
      ) : (
        <form
          className="h-[650px] z-[50] shadow-md shadow-slate-500 w-[90%] mx-auto  mt-2 p-4"
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
            {/* <VideoUploadWidget /> */}
            <label
              htmlFor="postvideo"
              className="bg-gray-300 title py-2 px-3 mt-2 min-w-[115px] rounded-xl whitespace-nowrap"
            >
              Upload Video
            </label>

            <input
              id="postvideo"
              className="hidden"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && <p>Uploading...</p>}
            <ArrowBack
              className="  text-white"
              size="17px"
              sx={{ fontSize: "19px", color: "white" }}
              onClick={() => setShowPosts(false)}
            />
          </div>
          <div className="h-[300px] md:h-[360px] bg-gray-800 mt-7">
            {videoUrl && (
              <div>
                <video
                  className="w-full h-[100%] object-cover"
                  src={fileUrl}
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
          <div className="h-[30px] w-[100%] text-center">
            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              className="h-full w-[80%]   text-[15px]  p-4"
            >
              {!loading ? (
                "Post"
              ) : (
                <CircularProgress
                  size="13px"
                  sx={{ color: "white", fontBold: "500" }}
                  className="bg-orange-700 rounded-tr-full text-[15px] font-bold"
                />
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserPost;
