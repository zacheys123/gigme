// // "use client";
// // import useStore from "@/app/zustand/useStore";
// // import { useEffect } from "react";
// // import { Button } from "./ui/button";

// // const VideoUploadWidget = () => {
// //   const { setUrl } = useStore();
// //   useEffect(() => {
// //     // Load Cloudinary's widget
// //     const cloudinary = window.cloudinary;

// //     // Create the widget configuration
// //     const widget = cloudinary.createUploadWidget(
// //       {
// //         cloudName: "dsziq73cb",
// //         uploadPreset: "gigmeZach",
// //         resourceType: "video", // Limit upload to videos
// //         sources: ["local", "url", "camera"], // Options for video upload
// //         multiple: false, // Allow only one video upload at a time
// //         clientAllowedFormats: ["mp4", "mov", "avi"], // Allow only video formats
// //         maxFileSize: 50000000, // Optional: Limit file size to 50MB
// //       },
// //       (error, result) => {
// //         if (!error && result && result.event === "success") {
// //           setUrl(result?.info);
// //           console.log("Video uploaded successfully: ", result.info);
// //           // Handle the result (e.g., save video URL to your backend or state)
// //         }
// //       }
// //     );

// //     // Open the widget when clicking a button
// //     document.getElementById("upload_widget").addEventListener("click", () => {
// //       widget.open();
// //     });
// //   }, []);

// //   return (
// //     <div>
// //       <Button
// //         variant="secondary"
// //         id="upload_widget"
// //         className=" h-[23px] p-2 text-[11px] "
// //       >
// //         Browse Video
// //       </Button>
// //     </div>
// //   );
// // };

// // export default VideoUploadWidget;

// // Example function to upload a file to Cloudinary with signed upload preset
// async function uploadFileToCloudinary(file) {
//   const timestamp = Math.round(new Date().getTime() / 1000);

//   // Fetch the signature and other required parameters from your server
//   const response = await fetch("/api/post/get-cloudinary-signature", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ timestamp: timestamp }),
//   });

//   const data = await response.json();

//   const { signature, api_key, upload_preset, cloud_name } = data;

//   // Create FormData to send the file and signature to Cloudinary
//   const formData = new FormData();
//   formData.append("file", file); // The actual file being uploaded
//   formData.append("timestamp", timestamp); // Ensure the timestamp matches the server-side signature
//   formData.append("signature", signature); // Signature generated on the server
//   formData.append("api_key", api_key); // Your Cloudinary API key
//   formData.append("upload_preset", upload_preset); // The signed preset name

//   // Make the request to Cloudinary
//   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//   const cloudinaryResponse = await fetch(cloudinaryUrl, {
//     method: "POST",
//     body: formData,
//   });

//   const cloudinaryData = await cloudinaryResponse.json();
//   return cloudinaryData;
// }

// // Example usage:
// const fileInput = document.querySelector("#file-upload-input");
// fileInput.addEventListener("change", async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const result = await uploadFileToCloudinary(file);
//     console.log("File uploaded to Cloudinary:", result);
//   }
// });
