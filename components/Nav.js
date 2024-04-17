import UsersButton from "./UsersButton";
import { UserButton, auth, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
// import { useGlobalContext } from "@/app/Context/store";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
const Nav = async () => {
  const { userId } = auth();
  return (
    <div className="bg-gray-600 top-0">
      <nav className="container mx-auto max-w-[100vw] xl:w-[60vw] p-3 bg-cyan-800 flex items-center justify-between">
        <Link href="/" className="tracking-tighter cursor-pointer">
          <span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
            GigMe
          </span>
          <span className=" text-yellow-100 font-bold p-1 shadow-blue-500">
            Up
          </span>
        </Link>
        <span className="hidden md:flex">
          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex gap-4">
              {" "}
              <UsersButton
                link="/sign-in"
                title="SignIn"
                className="text-white font-arial bg-slate-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
              <UsersButton
                link="/sign-up"
                title="SignUp"
                className="text-white font-arial bg-white-800 py-[6px] hover:bg-slate-600  px-3 w-[80px] border border-yellow-500  rounded-xl "
              />{" "}
            </div>
          )}{" "}
        </span>
      </nav>{" "}
    </div>
  );
};

export default Nav;
