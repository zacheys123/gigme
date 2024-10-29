"use client";
import ClientOnly from "@/app/ClientOnly";
import { useNotification } from "@/app/Context/notificationContext";
import useStore from "@/app/zustand/useStore";
import SocialNav from "@/components/GigmeNav";
import LogoutComponent from "@/components/LogoutComponent";
import UserModal from "@/components/modals/UserModal";
import MyNotifications from "@/components/MyNotifications";
import ToolTip from "@/components/postComponents/ToolTip";
import LeftBar from "@/components/socials/LeftBar";
import RightBar from "@/components/socials/RightBar";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { requestPermission } from "@/lib/firebase/firebaseClient";
import { useAuth, useUser } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";
const GigmeLayout = ({ children, modal, chat }) => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const { isLoaded, userId } = useAuth();
  const [permissionStatus, setPermissionStatus] = useState(null); // State to track permission status
  // Replace with your actual logic to get the user ID
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(false); // State for loading status

  const { user: id } = useCurrentUser(userId);
  const myid = id?.user?._id;

  const { notification } = useNotification();

  const registerUser = useCallback(async () => {
    if (!user) {
      console.error("No user data to send.");
      return;
    }

    console.log("Sending user to backend:", user);

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await res.json();

    window?.localStorage.setItem("user", JSON.stringify(data?.results));
    if (data?.userstatus === false) {
      return router.push("/gigme/social");
    }
  }, [user, router]);

  useEffect(() => {
    if (user && isSignedIn) {
      registerUser();
    } else {
      console.log("User data not available or not signed in.");
    }
  }, [user, isSignedIn, registerUser]);

  useEffect(() => {
    // Load the Cloudinary widget library
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const { logout } = useStore();
  if (!isLoaded || !userId) {
    return (
      <div className="h-screen w-full">
        <div className="flex justify-center items-center h-screen flex-col">
          <CircularProgress size="100px" />
          <span className="mt-2 text-2xl font-bold">
            Please wait a moment :)..
          </span>
        </div>
      </div>
    );
  }
  console.log(logout);
  return (
    <ClientOnly>
      {notification?.data?._id && notification.data._id === myid && (
        <MyNotifications
          message={notification.message}
          senderId={notification.data._id}
        />
      )}
      <div className="absolute z-[50]">
        <UserModal open={logout} />
      </div>

      <div className="flex flex-col gap-2 relative">
        <Toaster expand={false} richColors position="top" />
        <SocialNav /> <ToolTip id={id} />
        <div className="flex">
          <LeftBar />
          {chat}
          {modal}
          {children}
          <RightBar />
        </div>
      </div>
    </ClientOnly>
  );
};

export default GigmeLayout;

/* <motion.div
        initial={{ opacity: 0, y: ["-400px", "-200px", "-50px", 0, ""] }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        animate={{
          opacity: 1,
          y: "40px",
          transition: {
            type: "linear",
            stiffness: 100,
            damping: 10,
          },
        }}
        className="absolute w-[100vw] flex justify-center mt-4"
      >
        <div className="absolute h-[50px] w-[290px] bg-neutral-400 p-2 rounded-full top-0 z-50 mx-auto">
          <div className="flex items-center justify-around">
            {loading && <p>Loading...</p>} {/* Show loading message */
//       error && <p style={{ color: "red" }}>{error}</p>
//       // {ermissionStatus === "granted" ? (
//         <p> claassName={"text-[neutral-300"}Notifications are enabled!</p>
//       ) : permissionStatus === "denied" ? (
//         <p className="title text-[neutral-300]">
//           Notifications are blocked. Please enable them in your settings.
//         </p>
//       ) : (
//         <button
//           onClick={handleRequestPermission}
//           disabled={loading}
//           className="title text-[neutral-300]"
//         >
//           {loading ? "Enabling..." : "Allow"}
//         </button>
//       )}
//     </div>
//   </div>
// </motion.div>
