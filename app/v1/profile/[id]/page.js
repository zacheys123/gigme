import MoreInfoPage from "@/components/userprofile/MoreInfoPage";
import RouteProfile from "@/components/userprofile/RouteProfile";
import { checkEnvironment } from "@/utils";
const getCurrentUser = async (userId) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${userId.id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const ProfilePage = async ({ params }) => {
  const user = await getCurrentUser(params);
  console.log(user);
  return (
    <div className="container h-[calc(100vh-100px)] w-screen overflow-auto flex flex-col gap-2">
      <h2 className="text-2xl text-white">
        Profile Landing Page
        <br />
        <span className="text-sm text-gray-400">
          Welcome, {user?.user?.firstname}!
        </span>
      </h2>
      <RouteProfile user={user} />
      <section>
        <MoreInfoPage user={user} />
      </section>
    </div>
  );
};

export default ProfilePage;
