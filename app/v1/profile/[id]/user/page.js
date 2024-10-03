import CurrentUserProfile from "@/components/user/CurrentUserProfile";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
// Get current User
async function getCurrentUser(userId) {
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
    const { user } = await res.json();
    return user;
  } catch (error) {
    console.log("error getting user profilee", error);
  }
}
const UserProfile = async () => {
  const { userId } = auth();
  const user = await getCurrentUser(userId);
  return (
    <div
      className=" sm:w-[85%] mx-auto sm:h-[calc(100vh-30px)] md:h-[calc(100vh-120px)] md:w-[80%] flex
      h-screen flex-col md:flex overflow-auto  items-center shadow-md shadow-slate-500 p-4 w-[90%]  md:ml-[35px]"
    >
      <CurrentUserProfile user={user} />
    </div>
  );
};

export default UserProfile;
