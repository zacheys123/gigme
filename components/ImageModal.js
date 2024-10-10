import Image from "next/image";
import React from "react";

function ImageModal({ user, handleClose, fileUrl, motion }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="absolute inset-0 h-full w-full bg-neutral-600 bg-cover bg-center opacity-50"></div>
      <div className="absolute z-10">
        <div className="absolute  bg-neutral-400 h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer">
          <span
            className="text-white font-bold text-[18px] "
            onClick={handleClose}
          >
            &times;
          </span>{" "}
        </div>
        <Image
          priority
          src={
            !fileUrl && user?.picture ? "" : fileUrl ? fileUrl : user?.picture
          }
          className="object-cover w-[680px] h-[680px] rounded-xl"
          alt={user?.firstname.split("")[0]}
          width={680}
          height={680}
        />
      </div>
    </motion.div>
  );
}

export default ImageModal;
