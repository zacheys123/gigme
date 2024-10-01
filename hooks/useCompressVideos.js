import { useGlobalContext } from "@/app/Context/store";
import { useState, useEffect } from "react";

export function useCompressVideos(videoFile) {
  const [compressedVideoUrl, setCompressedVideoUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  const compressVideo = async () => {
    try {
      const uploadPreset = "gigmeZach"; // Replace with your Cloudinary upload preset

      const uploadData = new FormData();
      uploadData.append("file", compressedFile);
      uploadData.append("upload_preset", uploadPreset);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsziq73cb/video/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();

      if (data.error) {
        setUploadError(data.error.message);
      } else {
        setCompressedVideoUrl(data.secure_url);

        console.log(data);
        setUserState({
          type: global.SHOWPOSTS,
          payload: !showPosts,
        });
      }
    } catch (error) {
      setUploadError(error.message);
    }
  };

  return { compressedVideoUrl, uploadError, compressVideo };
}
