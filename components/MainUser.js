"use client";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
const MainUser = ({ user }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/users/friends/${user.username}`)}
      className=" bg-gray-800/80 ml-[40px] text-neutral-400 w-[300px] my-4 rounded-xl p-2 cursor-pointer hover:bg-gray-500/80 transition ease-in-out delay-150 hover:-translate-x-2 hover:scale-20  duration-300"
    >
      <div className="flex gap-4 items-center ">
        {" "}
        <Avatar
          src={user?.picture}
          className="rounded-full"
          alt="profile image"
        />
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-2">
            {user?.firstname} {user.lastname}
          </div>
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
};
export default MainUser;
