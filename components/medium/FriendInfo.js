import Image from "next/image";
import React from "react";

const FriendInfo = ({ data }) => {
  console.log(data);
  return (
    <div className="hidden md:h-[200px] md:block  w-full">
      {" "}
      {data?.user?.picture && (
        <div className="h-full mt-5 flex justify-center items-center ">
          <Image
            src={data?.user?.picture}
            alt="profile pic"
            width={160}
            height={160}
            className="h-40 rounded-full"
          />
        </div>
      )}{" "}
      hey
    </div>
  );
};

export default FriendInfo;
