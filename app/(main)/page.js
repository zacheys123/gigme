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
export default function Home() {
  // const {
  //   authstate: {},
  //   setAuthState,
  // } = useGlobalContext();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const { isSignedIn, user } = useUser();

  if (!isLoaded && !userId) {
    localStorage.removeItem("user");
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
  return (
    // <main className="min-h-screen xl:container p-0 bg-neutral-800 w-screen">
    //   <ImageComponent bgCover={bgImage} />
    //   <div className=" my-[40px] mx-[50px] text-[23px] md:text-6xl bg-gradient-to-r  from-red-600 via-green-200  to-yellow-100 inline-block  text-transparent  bg-clip-text">
    //     {user && (
    //       <>
    //         Welcome to gigUp,
    //         <span className="text-[17px] mx-2 text-gray-400">
    //           {user?.firstName}!
    //         </span>
    //       </>
    //     )}{" "}
    //   </div>
    //   <div className="h-[70vh] w-100 flex justify-center items-center">
    //     <div className=" flex-col gap-4 text-2xl xl:text-7xl text-center md:flex-row md:text-6xl">
    //       <p className="text-2xl md:text-6xl font-bold  bg-gradient-to-r  from-yellow-200 via-green-100 to-purple-200 inline-block  text-transparent  bg-clip-text">
    //         get gigs anytime anywhere,
    //       </p>{" "}
    //       <div>
    //         <p className="md:text-6xl font-bold  bg-gradient-to-r  from-orange-300 via-green-200 to-purple-100 inline-block  text-transparent  bg-clip-text">
    //           chat
    //         </p>
    //         <span className="  md:text-6xl md:font-bold bg-cyan-100 bg-clip-text text-transparent text-center">
    //           {" "}
    //           and{" "}
    //           <span className=" md:text-6xl  bg-gradient-to-r  from-gray-200 via-yellow-300 to-slate-600 inline-block  text-transparent  bg-clip-text">
    //             connect with
    //           </span>{" "}
    //         </span>
    //       </div>
    //       <div>
    //         <span className="text-center font-bold bg-gradient-to-r   from-gray-200  text-[18px] via-gray-500 to-purple-200  inline-block  text-transparent  bg-clip-text">
    //           musician you know,anyWhere in the country
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <Card className="container mx-auto max-w-[80vw] h-[230px] p-4 text-center flex flex-col gap-4 xl:w-[60vw]">
    //     <span className="Ffont-bold tracking-tighter  text-2xl ">
    //       For more information on what gigmeup is,contact us here.Send us ur
    //       feedback or concern.
    //     </span>
    //     <form>
    //       <Input type="text" placeholder="Give us feedback" />
    //       <UsersButton
    //         onClick={() => console.log("Email Button clicked!!!")}
    //         title="Send FeedBack"
    //         className="w-[140px]  bg-purple-600 border border-yellow-300 rounded-full py-3  text-white my-3 hover:bg-slate-500"
    //       />
    //     </form>
    //   </Card>
    //   <div className="mt-[120px] mb-[120px] flex  gap-4md:gap-40 flex-col md:flex-row justify-center items-center">
    //     <Image src={left} alt="something" className="flex-1 m-3 rounded-full" />
    //     <Card className="flex flex-col p-5 w-[80vw] md:w-[50vw] xl:w-[30vw] my-4 text-white h-[20vh] bg-black">
    //       <h1>
    //         <span className="flex  ">
    //           If you want to get the direct feeling and also access more data
    //           and connect easily with your friends ,get this app
    //         </span>
    //       </h1>
    //       <UsersButton
    //         onClick={() => console.log("Email Button clicked!!!")}
    //         title="Google Play"
    //         className="md:w-[20vw] mx-auto flex md:gap-1 bg-white  border border-black rounded-xl  text-white md:my-3  my-2 mb-3 md:-mb-[30px]  px-3   md:px-0 py-1 md:py-2"
    //         image={google}
    //         span="GET IT ON"
    //       />
    //     </Card>
    //   </div>
    //   <Footer container className="bg-neutral-800 p-2">
    //     <Footer.Copyright
    //       href="#"
    //       className="text-neutral-300"
    //       by="GigMeApp™"
    //       year={2022}
    //     />
    //     <Footer.LinkGroup className="bg-transparent flex justify-around my-4">
    //       <Footer.Link href="#" className="text-neutral-300">
    //         About
    //       </Footer.Link>{" "}
    //       <span className="text-neutral-400">|</span>
    //       <Footer.Link href="#" className="text-neutral-300">
    //         Privacy Policy
    //       </Footer.Link>{" "}
    //       <span className="text-neutral-400">|</span>
    //       <Footer.Link href="#" className="text-neutral-300">
    //         Licensing
    //       </Footer.Link>{" "}
    //       <span className="text-neutral-400">|</span>
    //       <Footer.Link href="#" className="text-neutral-300">
    //         Contact
    //       </Footer.Link>{" "}
    //       <span className="text-neutral-400">|</span>
    //     </Footer.LinkGroup>
    //   </Footer>
    // </main>
    // <div>
    //   <Head>
    //     <title>Music Jam App</title>
    //     <meta
    //       name="description"
    //       content="Jam, Discover, React - Join the Music Community"
    //     />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   {/* Hero Section */}
    //   <header className="bg-gradient-to-r from-purple-600 to-blue-400 text-white py-20">
    //     <div className="container mx-auto text-center">
    //       <h1 className="text-5xl font-bold mb-4">Jam, Discover, React</h1>
    //       <p className="text-lg mb-8">
    //         Share your jam sessions, discover new music, and connect with
    //         musicians around the world.
    //       </p>
    //       <Link
    //         href="#features"
    //         className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200"
    //       >
    //         Get Started
    //       </Link>
    //     </div>
    //   </header>

    //   {/* Features Section */}
    //   <section id="features" className="py-20 bg-gray-100">
    //     <div className="container mx-auto">
    //       <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
    //       <div className="grid md:grid-cols-3 gap-12 text-center">
    //         <div className="bg-white p-6 rounded-lg shadow-lg">
    //           <img
    //             src="/images/post-jam.svg"
    //             alt="Post Jam"
    //             className="w-16 h-16 mx-auto mb-4"
    //           />
    //           <h3 className="text-xl font-semibold mb-2">Post Your Jam</h3>
    //           <p className="text-gray-600">
    //             Share your jam sessions with the community in a fun and engaging
    //             way.
    //           </p>
    //         </div>

    //         <div className="bg-white p-6 rounded-lg shadow-lg">
    //           <img
    //             src="/images/discover.svg"
    //             alt="Discover"
    //             className="w-16 h-16 mx-auto mb-4"
    //           />
    //           <h3 className="text-xl font-semibold mb-2">Discover New Jams</h3>
    //           <p className="text-gray-600">
    //             Explore jams from musicians across the globe and find
    //             inspiration.
    //           </p>
    //         </div>

    //         <div className="bg-white p-6 rounded-lg shadow-lg">
    //           <img
    //             src="/images/react.svg"
    //             alt="React to Posts"
    //             className="w-16 h-16 mx-auto mb-4"
    //           />
    //           <h3 className="text-xl font-semibold mb-2">React and Connect</h3>
    //           <p className="text-gray-600">
    //             Like, comment, and connect with other musicians to grow your
    //             network.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Call to Action Section */}
    //   <section className="bg-gradient-to-r from-green-500 to-teal-400 py-20 text-white">
    //     <div className="container mx-auto text-center">
    //       <h2 className="text-4xl font-bold mb-4">Ready to Jam?</h2>
    //       <p className="text-lg mb-8">
    //         Join the music community and start posting your jams today!
    //       </p>
    //       <Link
    //         href="/signup"
    //         className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-gray-200"
    //       >
    //         Sign Up Now
    //       </Link>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="bg-gray-800 text-white py-6">
    //     <div className="container mx-auto text-center">
    //       <p>&copy; 2024 Music Jam App. All rights reserved.</p>
    //     </div>
    //   </footer>
    // </div>

    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* <ImageComponent bgCover={bgImage} /> */}
      <section
        className="flex flex-col items-center justify-center min-h-[520px] text-center bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-lg"
        >
          <h6 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Create and Book Gigs
          </h6>
          <h6 className="text-3xl sm:text-4xl font-extrabold mb-6">
            and Unleash Your Inner Jam!
          </h6>
          <p className="text-lg text-gray-300 mb-10">
            Post your jam sessions, discover other artists, and react to amazing
            jams from around the world.
          </p>
          <Link
            href="/gigme/social"
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-all"
          >
            Start Jamming
          </Link>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="container bg-neutral-800 rounded-md mx-auto max-w-[80vw] h-[230px] p-4 text-center flex flex-col gap-4 xl:w-[60vw] -mt-[19px] mb-9"
      >
        <span className="font-bold tracking-wider  font-sans text-[23px] ">
          For more information on what igigup is,contact us here.Send us ur
          feedback or concern.
        </span>
        <form>
          <Input type="text" placeholder="Give us feedback" />
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
              Upload your music jam sessions and share your passion with others.
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
              {`Like, comment, and share your thoughts on others' jam sessions.`}
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
        <p>© 2024 IgigUp. All rights reserved.</p>
      </footer>
    </div>
  );
}
