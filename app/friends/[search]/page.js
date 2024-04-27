"use client";
import MyFooter from "@/components/Footer";
import UsersButton from "@/components/UsersButton";
import FriendsMobileNav from "@/components/mobile/FriendsMobileNav";
import MobileProfileNav from "@/components/mobile/MobileProfileNav";
import MobileSheet from "@/components/mobile/MobileSheet";
import { Button } from "@/components/ui/button";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
const FriendsProfilePage = () => {
  const { search } = useParams();
  const [follows, setFollow] = useState(false);
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["frienddata"],
    queryFn: async () => {
      const res = await fetch(`/api/user/friend/${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  const follow = (ev) => {
    ev.preventDefault();
    setFollow((prev) => !prev);
  };
  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-auto h-[calc(100vh-20px)] bg-gray-700/70 w-full">
      <FriendsMobileNav />
      <div className="h-[calc(100vh-20px)]">
        <Box className="flex items-center   justify-around md:justify-self-auto shadow-md bg-inherit h-[200px] w-full md:h-[400px]">
          <Box className="flex gap-2 items-center">
            {data?.user?.picture && (
              <div className="h-full flex justify-center items-center ">
                <Image
                  src={data?.user?.picture}
                  alt="profile pic"
                  width={160}
                  height={160}
                  className="h-40 rounded-full"
                />
              </div>
            )}{" "}
            <div className="flex flex-col gap-4 h-full ">
              <div>
                <h3 className="h1 ml-3 text-white">
                  {data?.user?.firstname} {data?.user?.lastname}
                </h3>{" "}
                <h3 className="font-mono ml-3 text-white">
                  {data?.user?.email}
                </h3>
              </div>
              <div className="md:hidden flex items-center justify-center">
                {follows ? (
                  <Button
                    variant="primary"
                    onClick={follow}
                    className=" text-[13px]"
                  >
                    GigFollow <Add />
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={follow}
                    className=" text-[13px] flex items-center"
                  >
                    GigUnFollow <TiTick size="20px" />
                  </Button>
                )}
              </div>
            </div>
          </Box>
          <div className="hidden md:flex md:flex-col ">
            {follows ? (
              <Button variant="primary" onClick={follow} className=" text-base">
                GigFollow <Add />
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={follow}
                className=" text-base"
              >
                GigUnFollow <TiTick size="30px" />
              </Button>
            )}
          </div>
        </Box>
      </div>
      <Footer container className="hidden md:flex b-0">
        <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="/gigme/about">About</Footer.Link>
          <Footer.Link href="/gigme/privacy">Privacy Policy</Footer.Link>
          <Footer.Link href="/gigme/licencing">Licensing</Footer.Link>
          <Footer.Link href="/gigme/contact">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default FriendsProfilePage;
