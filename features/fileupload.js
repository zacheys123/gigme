export const fileupload = async (
  event,
  updatefileFunc,
  toast,
  allowedTypes,
  fileUrl,
  setFileUrl,
  setIsUploading,
  dep
) => {
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

  // Check if the file is a ${dep}

  if (!allowedTypes.includes(file.type)) {
    toast.error(`Only ${dep} files are allowed`);
    return;
  }

  // Reset error
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

    // Step 2: Upload the ${dep} file to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("cloud_name", cloud_name);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${dep}/upload/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadResult = await uploadResponse.json();

    if (uploadResponse.ok) {
      if (dep === "video") alert("Upload successful!");
      console.log("Upload successful!");
      console.log(uploadResult); // You can process this result further (e.g., store the URL)
      updatefileFunc(uploadResult.secure_url);
      if (dep === "video") toast.success(`${dep} uploaded successfully!`);
      console.log(`${dep} uploaded successfully!`);
    } else {
      toast.error("Upload failed, please try again.");
      console.error(uploadResult);
    }
  } catch (error) {
    toast.error("An error occurred during upload.");
    console.error("An error occurred during upload.", error);
  } finally {
    setIsUploading(false);
  }
};
