"use client";
import useStore from "@/app/zustand/useStore";
import { useEffect } from "react";
import { Button } from "./ui/button";

const VideoUploadWidget = () => {
  const { setUrl } = useStore();
  useEffect(() => {
    // Load Cloudinary's widget
    const cloudinary = window.cloudinary;

    // Create the widget configuration
    const widget = cloudinary.createUploadWidget(
      {
        cloudName: "dsziq73cb",
        uploadPreset: "gigmeZach",
        resourceType: "video", // Limit upload to videos
        sources: ["local", "url", "camera"], // Options for video upload
        multiple: false, // Allow only one video upload at a time
        clientAllowedFormats: ["mp4", "mov", "avi"], // Allow only video formats
        maxFileSize: 50000000, // Optional: Limit file size to 50MB
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setUrl(result?.info);
          console.log("Video uploaded successfully: ", result.info);
          // Handle the result (e.g., save video URL to your backend or state)
        }
      }
    );

    // Open the widget when clicking a button
    document.getElementById("upload_widget").addEventListener("click", () => {
      widget.open();
    });
  }, []);

  return (
    <div>
      <Button
        variant="secondary"
        id="upload_widget"
        className=" h-[23px] p-2 text-[11px] "
      >
        Browse Video
      </Button>
    </div>
  );
};

export default VideoUploadWidget;
