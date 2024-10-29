"use client";
import useStore from "@/app/zustand/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";
import { Cancel } from "@mui/icons-material";
import { useNotification } from "@/app/Context/notificationContext";

const MyNotifications = ({ message, setSenderMess, mess }) => {
  const [loading, setLoading] = useState();
  const router = useRouter();
  const { notification, setNotification } = useNotification();
  console.log(notification);
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
      className={
        mess
          ? "fixed flex  flex-col  top-0 right-10 bg-white p-1   text-sm h-[44px] font-bold"
          : "fixed flex  flex-col  top-0 right-10 bg-white p-1   text-sm h-[94px] w-[40vw] shadow-md shadow-slate-700 rounded-md"
      }
      style={{ zIndex: 9999 }}
    >
      <div className="w-full flex justify-end">
        <span
          className="text-[13px] font-extrabold cursor-pointer"
          onClick={() => {
            if (mess) {
              setSenderMess("");
            }
            setNotification({
              data: { _id: "" },
              message: "",
              createdAt: new Date(),
            });
          }}
        >
          &times;
        </span>
      </div>
      <h6 className="text-neutral-500 text-[10px]"> {message}</h6>
      <div className="flex items-center justify-around gap-2">
        {!mess && (
          <ButtonComponent
            variant="outline"
            classname=" h-[20px] text-[10px] my-1 font-bold max-w-[55px]"
            onclick={() => {
              setLoading(true);

              if (notification?.data?._id && notification.postedBy) {
                setTimeout(() => {
                  setNotification({
                    data: { _id: "" },
                    message: "",
                    createdAt: new Date(),
                  });
                  // After the operation, you can handle the logic for reading the post
                  setTimeout(() => {
                    router.push(
                      `/gigme/customgig/${notification?.data?._id}/${notification.postedBy}`
                    );
                  }, 1000);

                  // Reset the loading state after reading
                  setLoading(false);
                }, 2000);
              } else {
                setLoading(false);
                console.log("No notification found.");
              }
            }}
            title={
              loading ? (
                <span>Loading...</span>
              ) : (
                <span className="text-[9px]">🤝gigup</span>
              )
            }
          />
        )}
      </div>
    </motion.div>
  );
};

export default MyNotifications;
