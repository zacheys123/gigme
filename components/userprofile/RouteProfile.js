"use client";
import useStore from "@/app/zustand/useStore";
import { useAuth } from "@clerk/nextjs";
import { Pencil, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropTypes } from "prop-types";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Camera } from "@mui/icons-material";
import { BsCameraFill } from "react-icons/bs";
import { Button } from "../ui/button";
const RouteProfile = ({ user }) => {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const {
    setShowFriendData,

    setShowPostedGigsData,

    setShowBookedGigsData,

    setShowAllGigsData,
  } = useStore();
  const { userId } = useAuth();
  const router = useRouter();
  // get the file/image when it changes
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

  console.log(url);
  return (
    <div
      className="flex flex-col items-center gap-4 "
      onClick={() => {
        setShowFriendData(false);
        setShowPostedGigsData(false);
        setShowBookedGigsData(false);
        setShowAllGigsData(false);
      }}
    >
      <div className=" relative w-[200px] h-[200px]">
        {!fileUrl && (
          <>
            {" "}
            <label
              variant="closed"
              className="absolute bottom-[10px] right-[37px] text-white  p-1  text-[10px] lg:cursor-pointer bg-gray-900 rounded-full"
              htmlFor="imageId"
            >
              <BsCameraFill size="30px" sx={{ fontSize: "24px" }} />
            </label>{" "}
          </>
        )}

        <Image
          priority
          src={!fileUrl ? user?.user?.picture : fileUrl}
          className="object-cover w-[200px] h-[200px] rounded-full"
          alt={user?.user?.firstname.split("")[0]}
          width={200}
          height={200}
        />

        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "gigmeZach");
            try {
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

              // update user picture in the database
              await fetch(`/api/user/updateImage/${user?.user?._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: imageUrl }),
              });
              router.refresh();
            } catch (error) {
              console.error("Error uploading image to database:", error);
            }
          }}
        >
          <Input
            type="file"
            id="imageId"
            className="bg-transparent flex-1 border-none outline-none hidden "
            name="media"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            onChange={handleChange}
          />
          {fileUrl && (
            <Button
              type="submit"
              variant="destructive"
              className="absolute bottom-[10px] right-[37px] text-[11px] h-[20px]"
            >
              Upload Image
              <Upload size="11px" className=" font-bold" />
            </Button>
          )}
        </form>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-xl text-white">
          {user?.user?.firstname} {user?.user?.lastname}
        </h3>
        <Pencil
          color="white"
          size="14px"
          onClick={() => router.push(`/v1/profile/${userId}/user`)}
        />
      </div>
      <p className="text-sm text-gray-400">{user?.user?.email}</p>
    </div>
  );
};

export default RouteProfile;

RouteProfile.propTypes = {
  user: PropTypes.object,
};
