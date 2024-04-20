"use client";
import Transition from "@/components/Transition";
import UsersButton from "@/components/UsersButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const ContactUs = () => {
  let classname = "flex justify-center items-center h-screen w-screen";
  let variant = {
    initial: {},
    animate: {},
    transition: {},
  };
  return (
    <Transition variant={variant} className={classname}>
      <Card className="h-[460px] w-[400px] rounded-xl">
        <h3 className="font-bold text-center mt-5">Contact Us</h3>
        <form className="flex flex-col items-center p-3">
          <Input className="mx-auto my-3" type="text" placeholder="FullName" />
          <Input
            className="mx-auto my-3"
            type="text"
            placeholder="Email Address"
          />{" "}
          <Input className="mx-auto my-3" type="text" placeholder="Subject" />{" "}
          <textarea
            className="my-3"
            cols="40"
            rows="4"
            placeholder="Message"
          ></textarea>
          <UsersButton
            title="Send Email"
            onClick={() => console.log("send Email")}
            className="bg-blue-400 text-white font-bold font-mono p-2 hover:bg-blue-600/20 hover:text-red-600"
          />
        </form>
      </Card>
    </Transition>
  );
};

export default ContactUs;
