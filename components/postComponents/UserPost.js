"use client";
import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiBell } from "react-icons/hi";
import { Button } from "../ui/button";
import { Camera } from "@mui/icons-material";
import Image from "next/image";
import { useGlobalContext } from "@/app/Context/store";
import { global } from "@/actions";
import { CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { Input } from "../ui/input";
const UserPost = ({ user }) => {
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
      media: url,
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
              className="mt-2"
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
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "gigmeZach");
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/dsziq73cb/image/upload",
              {
                method: "POST",
                body: data,
              }
            );
            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.secure_url;
            setUrl(imageUrl);
            console.log(imageUrl);

            setUserState({ type: global.SHOWPOSTS, payload: !showPosts });
          }}
          className="h-[90px] bg-gray-600 shadow-full w-[90%] mx-auto p-3 mt-8"
        >
          <input
            id="openImage"
            type="file"
            className="bg-transparent flex-1 border-none outline-none hidden "
            name="media"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            onChange={handleChange}
          />

          <div className="w-full">
            <TextInput
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
            />
          </div>
          <div className="flex justify-between items-center w-full mx-auto mt-4">
            <label
              variant="closed"
              className="text-white border-2 p-1 rounded-xl text-[10px] lg:cursor-pointer"
              htmlFor="openImage"
            >
              UploadImage <Camera size="30px" sx={{ fontSize: "17px" }} />
            </label>
            <Button
              type="submit"
              className="text-white font-bold border-2 p-2 rounded-xl text-[10px] lg:cursor-pointer"
            >
              Submit image details
            </Button>
          </div>
          <div className="h-fit bg-gray-200 mt-7">
            {file?.type?.startsWith("image/") ? (
              <div className="w-full h-[240px] md:h-[360px]">
                {fileUrl && (
                  <Image
                    className="object-cover w-full h-[240px] md:h-[360px]"
                    src={fileUrl}
                    alt={file?.name}
                    width={140}
                    height={140}
                  />
                )}
              </div>
            ) : (
              <div>
                <video
                  className="object-cover"
                  src={fileUrl}
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
        </form>
      )}
    </>
  );
};

export default UserPost;
