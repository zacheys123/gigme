"use client";
import Image from "next/image";
import bgImage from "@/public/assets/png/logo-black.png";
import { Card } from "@/components/ui/card";

import { Footer, TextInput } from "flowbite-react";
import postimage from "@/public/assets/post.jpg";

import postimag from "@/public/assets/left-image.jpg";
import reactimage from "@/public/assets/svg/logo-no-background.svg";

import { CircularProgress } from "@mui/material";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import ImageComponent from "@/components/ImageComponent";
import UsersButton from "@/components/UsersButton";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotification } from "../Context/notificationContext";
import MyNotifications from "@/components/MyNotifications";
export default function Home() {
  // const {
  //   authstate: {},
  //   setAuthState,
  // } = useGlobalContext();
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user: id } = useCurrentUser(userId);
  const myid = id?.user?._id;
  const { isSignedIn, user } = useUser();
  const { notification } = useNotification();
  if (!isLoaded && !userId) {
    localStorage.removeItem("user");
    return (
      <div className="h-screen w-full">
        <div className="flex justify-center items-center h-screen flex-col">
          <CircularProgress size="100px" />
          <span className="mt-2 text-1xl font-bold">
            Please wait a moment :)..
          </span>
        </div>
      </div>
    );
  }
  let sentence = `Welcome to gigUp, ${user?.firstName}!`;
  const words = sentence.split(" ");
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6, // time between each word appearing
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  return (
    <>
      {notification?.data?._id && notification.data._id === myid && (
        <MyNotifications
          message={notification.message}
          senderId={notification.data._id}
        />
      )}
      <div className="bg-gray-900 min-h-screen text-white font-sans max-w-screen-screen-sm md:max-w-screen-md">
        <ImageComponent bgCover={bgImage} />
        <section
          className="flex flex-col items-center justify-center min-h-[520px] text-center bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {user && (
            <motion.div
              className="mb-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", gap: "6px" }} // keeps words spaced out
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="text-[16px] bg-gradient-to-l  from-yellow-600 via-gray-400  to-red-600 inline-block  text-transparent  bg-clip-text font-bold"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="bg-gradient-to-r from-purple-600 to-blue-400 text-white py-20"
          >
            <h1 className="text-5xl font-bold mb-4">Jam, Discover, Create</h1>
            <p className="text-lg mb-8">
              Share your jam sessions, create and book gigs, connect with
              musicians around the world.
            </p>
            <Link
              href="#features"
              className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200"
            >
              Get Started
            </Link>
          </motion.div>
        </section>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="container bg-neutral-900 shadow-md  shadow-slate-600 rounded-md mx-auto max-w-[80vw] h-[180px] p-4 text-center flex flex-col gap-4 xl:w-[60vw] mt-[17px] mb-9"
        >
          <span className=" tracking-wider  font-sans text-[17px] ">
            For more information on what gigup is,contact us here.Send us ur
            feedback or concern.
          </span>
          <form>
            <input
              type="text"
              placeholder="Ask a Question..."
              className=" w-[85%] mx-auto p-3 h-[35px]  bg-gray-300 text-black focus-within:ring-0 outline-none rounded-xl"
            />
            <UsersButton
              onClick={() => console.log("Email Button clicked!!!")}
              title="Send FeedBack"
              className="w-[140px]  bg-purple-600 border border-yellow-300 rounded-full py-3  text-white my-3 hover:bg-slate-500"
            />
          </form>
        </motion.div>
        {/* Features Section */}
        <section className="py-16 px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              onClick={() => {
                router.push("/gigme/social");
              }}
            >
              <Image
                src={postimage}
                alt="Post"
                className="mx-auto mb-6 h-20 w-20 object-fit"
                width={20}
                height={20}
              />
              <h3 className="text-2xl font-bold mb-4">Post Your Jam</h3>
              <p className="text-gray-400">
                Upload your music jam sessions and share your passion with
                others.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <Image
                src={postimag}
                alt="Post"
                className="mx-auto mb-6 h-20 w-20 object-fit"
                width={20}
                height={20}
              />
              <h3 className="text-2xl font-bold mb-4">Discover New Artists</h3>
              <p className="text-gray-400">
                Find incredible jams posted by other musicians from all over the
                globe.
              </p>
            </motion.div>
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <Image
                src={reactimage}
                alt="Post"
                className="mx-auto mb-6 h-20 w-20 object-fit"
                width={20}
                height={20}
              />
              <h3 className="text-2xl font-bold mb-4">React & Interact</h3>
              <p className="text-gray-400">
                {`Like, comment, and share your thoughts on other's jam sessions.`}
              </p>
            </motion.div>
          </div>
        </section>
        {/* Call to Action */}
        <section className="bg-yellow-500 py-16 px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Ready to Jam?
            </h2>
            <Link
              href={`/gigme/gigs/${userId}`}
              className="px-8 py-4 bg-black text-yellow-500 rounded-lg font-bold hover:bg-gray-800 transition-all"
            >
              Join Now
            </Link>
          </motion.div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-800 py-8 text-center text-gray-500">
          <p>© 2024 gigUp. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
