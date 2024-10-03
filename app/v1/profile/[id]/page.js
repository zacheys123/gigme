import { getAllUsers } from "@/app/server-actions/getAllUsers";
import InfoComponent from "@/components/largedevices/InfoComponent";
import SideBar from "@/components/largedevices/Sidebar";
import MoreInfoPage from "@/components/userprofile/MoreInfoPage";
import RouteProfile from "@/components/userprofile/RouteProfile";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { Divider } from "@mui/material";

const getCurrentUser = async (userId) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
const ProfilePage = async ({ params }) => {
  const { userId } = auth();
  const user = await getCurrentUser(userId);
  const allUsers = await getAllUsers(user?.user?._id);

  console.log(allUsers);
  return (
    <div className="container h-[100vh] w-screen md:w-[70vw]  overflow-auto flex flex-col gap-2">
      <div className="text-2xl text-white mt-[35px]">
        Profile Landing Page
        <br />
        <span className="text-sm text-gray-400">
          Welcome, {user?.user?.firstname}!
        </span>
      </div>
      <RouteProfile user={user} />
      <section>
        <MoreInfoPage user={user} allUsers={allUsers} />
      </section>
      <div className=" hidden lg:flex w-full md:h-full lg:h-[490px] shadow-xl shadow-slate-700">
        <InfoComponent user={user} allUsers={allUsers} />
        <Divider />
        <SideBar user={user} allUsers={allUsers} />{" "}
      </div>
    </div>
  );
};

export default ProfilePage;
