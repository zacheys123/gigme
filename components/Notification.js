"use client";
import useStore from "@/app/zustand/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";
import { Cancel } from "@mui/icons-material";

const Notification = ({ message }) => {
  const [loading, setLoading] = useState();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: "-50px" }}
      animate={{ opacity: 1, y: "50px" }}
      transition={{ duration: 0.5 }}
      whileInView={{
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="fixed flex  flex-col  top-0 right-10 bg-white p-4   text-sm h-[70px] w-[40vw] shadow-md shadow-slate-700 rounded-md"
      style={{ zIndex: 9999 }}
    >
      <h6> {message}</h6>
      <div className="flex items-center justify-around gap-2">
        <ButtonComponent
          variant="outline"
          classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
          // onclick={() => {
          //   setLoadingFriend(user?._id);
          //   getUserId(user);
          //   setTimeout(() => {
          //     // After the operation, you can handle the logic for reading the post
          //     debHandlePermission();
          //     // Reset the loading state after reading
          //     setLoadingFriend(null);
          //   }, 2000);
          // }}
          title={
            loading ? (
              <span>Loading...</span>
            ) : (
              <span className="text-[9px]">
                cancel{" "}
                <Cancel
                  className="text-red-400 text-[14px]"
                  size="13px"
                  sx={{ fontSize: "13px" }}
                />{" "}
              </span>
            )
          }
        />
        <ButtonComponent
          variant="outline"
          classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
          // onclick={() => {
          //   setLoadingFriend(user?._id);
          //   getUserId(user);
          //   setTimeout(() => {
          //     // After the operation, you can handle the logic for reading the post
          //     debHandlePermission();
          //     // Reset the loading state after reading
          //     setLoadingFriend(null);
          //   }, 2000);
          // }}
          title={
            loading ? (
              <span>Loading...</span>
            ) : (
              <span className="text-[9px]">🤝gigup</span>
            )
          }
        />
      </div>
    </motion.div>
  );
};

export default Notification;
