"use client";
import useStore from "@/app/zustand/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";
import { Cancel } from "@mui/icons-material";
import { useNotification } from "@/app/Context/notificationContext";

const MyNotifications = ({ message, setSenderMess }) => {
  const [loading, setLoading] = useState();
  const router = useRouter();
  const { setNotification } = useNotification();
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
      className="fixed flex  flex-col  top-0 right-10 bg-white p-1   text-sm h-[91px] w-[40vw] shadow-md shadow-slate-700 rounded-md"
      style={{ zIndex: 9999 }}
    >
      <div className="w-full flex justify-end">
        <span
          className="text-[11px] font-bold cursor-pointer"
          onClick={() => {
            setNotification({
              data: { _id: "" },
              message: "",
              createdAt: new Date(),
            });
            setSenderMess("");
          }}
        >
          &times;
        </span>
      </div>
      <h6 className="text-neutral-500 text-[10px]"> {message}</h6>
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
              <span className="text-[9px]">🤝gigup</span>
            )
          }
        />
      </div>
    </motion.div>
  );
};

export default MyNotifications;
