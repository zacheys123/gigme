"use client";
import Image from "next/image";
import bgImage from "@/public/assets/bg-cover.jpg";
import { Card } from "@/components/ui/card";

import { Footer, TextInput } from "flowbite-react";
import left from "@/public/assets/left-image.jpg";
import google from "@/public/assets/goggleplay.png";
// import { useGlobalContext } from "../Context/store";
import Nav from "@/components/Nav";
import ImageComponent from "@/components/ImageComponent";
import UserButton from "@/components/UserButton";
export default function Home() {
  // const {
  //   authstate: {},
  //   setAuthState,
  // } = useGlobalContext();

  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-full">
  //       <div className="flex justify-center items-center h-screen flex-col">
  //         <CircularProgress size="100px" />
  //         <span className="mt-2 text-2xl font-bold">
  //           Please wait a moment :)..
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <main className="min-h-screen xl:container">
      <ImageComponent bgCover={bgImage} />
      <Nav />
      <div className="h-[70vh] w-100 flex justify-center items-center">
        <div className=" flex-col gap-4 text-2xl xl:text-7xl text-center md:flex-row md:text-6xl">
          <div>
            <span className="md:text-6xl  bg-gradient-to-r  from-orange-600 via-green-500 to-purple-100 inline-block  text-transparent  bg-clip-text">
              chat
            </span>
            <span className="  md:text-6xl md:font-bold bg-cyan-100 bg-clip-text text-transparent text-center">
              {" "}
              and{" "}
              <span className=" md:text-6xl  bg-gradient-to-r  from-yellow-400 via-green-300 to-purple-600 inline-block  text-transparent  bg-clip-text">
                connect with every
              </span>{" "}
            </span>
          </div>
          <div>
            <span className="text-center font-bold bg-gradient-to-r   from-orange-600 via-green-500 to-purple-100  inline-block  text-transparent  bg-clip-text">
              musician you know,anyWhere in the country
            </span>
          </div>
        </div>
      </div>
      <Card className="container mx-auto max-w-[80vw] h-[230px] p-4 text-center flex flex-col gap-4 xl:w-[60vw]">
        <span className="Ffont-bold tracking-tighter  text-2xl ">
          For more information on what gigmeApp is,contact us here.Send us ur
          feedback or concern.
        </span>
        <form>
          <TextInput type="text" placeholder="Give us feedback" />
          <UserButton
            onClick={() => console.log("Email Button clicked!!!")}
            title="Send FeedBack"
            className="w-[140px]  bg-purple-600 border border-yellow-300 rounded-full py-3  text-white my-3 hover:bg-slate-500"
          />
        </form>
      </Card>
      <div className="mt-[120px] mb-[120px] flex  gap-4md:gap-40 flex-col md:flex-row justify-center items-center">
        <Image src={left} alt="something" className="flex-1 m-3 rounded-full" />
        <Card className="flex flex-col p-5 w-[80vw] md:w-[50vw] xl:w-[30vw] my-4 text-white h-[20vh] bg-black">
          <h1>
            <span className="flex  ">
              If you want to get the direct feeling and also access more data
              and connect easily with your friends ,get this app
            </span>
          </h1>
          <UserButton
            onClick={() => console.log("Email Button clicked!!!")}
            title="Google Play"
            className="md:w-[20vw] mx-auto flex md:gap-1 bg-white  border border-black rounded-xl  text-white md:my-3  my-2 mb-3 md:-mb-[30px]  px-3   md:px-0 py-1 md:py-2"
            image={google}
            span="GET IT ON"
          />
        </Card>
      </div>
      <Footer container>
        <Footer.Copyright href="#" by="GigMeApp™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </main>
  );
}
