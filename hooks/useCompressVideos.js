import { useGlobalContext } from "@/app/Context/store";
import { useState, useEffect } from "react";

export function useCompressVideos(videoFile) {
  const [compressedVideoUrl, setCompressedVideoUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loader, setUploadLoader] = useState();

  const {
    userState: { showPosts },
    setUserState,
  } = useGlobalContext();
  const compressVideo = async (ev) => {
    ev.preventDefault();

    if (videoFile?.type?.startsWith("image/")) {
      alert("wrong format for video");
    } else {
      const uploadPreset = "gigmeZach"; // Replace with your Cloudinary upload preset

      const uploadData = new FormData();
      uploadData.append("file", videoFile);
      uploadData.append("upload_preset", uploadPreset);
      try {
        setUploadLoader(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dsziq73cb/video/upload",

          {
            method: "POST",
            body: uploadData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function (progressEvent) {
              let percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log("Upload Progress: " + percentCompleted + "%");
            },
          }
        );

        console.log(uploadData);
        const data = await response.json();

        if (data.error) {
          alert(data.error.message);
          setUploadError(data.error.message);
        } else {
          alert(data.secure_url);
          setCompressedVideoUrl(data.secure_url);

          console.log(data);
          setUserState({
            type: global.SHOWPOSTS,
            payload: !showPosts,
          });
        }
        setUploadLoader(false);
      } catch (error) {
        setUploadError("upload video failed in custom hooh", error.message);
      } finally {
        setUploadLoader(false);
      }
    }
  };

  return { compressedVideoUrl, uploadError, compressVideo, loader };
}
