import React from "react";

import { useState } from "react";
import { Image } from "cloudinary-react";
const ImageUpload = () => {
  const [image, setImage] = useState("");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gigme");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOuD_NAME}/image/upload}`,
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        placeholder="upload an image"
        onChange={uploadImage}
      />
      {image && <div></div>}
    </div>
  );
};

export default ImageUpload;
