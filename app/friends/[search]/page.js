import ClientOnly from "@/app/ClientOnly";
import { getFriend } from "@/app/server-actions/getFriend";

import FriendsComponent from "@/components/friends/FriendsComponent";
import UserModal from "@/components/modals/UserModal";

import { auth } from "@clerk/nextjs";
import { CircularProgress } from "@mui/material";

const FriendsProfilePage = async ({ params }) => {
  console.log(params);
  const { userId } = auth();
  const friend = await getFriend(params.search);
  if (!userId) {
    return (
      <div className="h-screen w-full bg-gray-300">
        <div className="flex justify-center items-center h-screen flex-col">
          <CircularProgress size="80px" />
          <span className="mt-2 text-1xl font-bold">
            <CircularProgress
              size="16px"
              sx={{ color: "red", fontWeight: "bold" }}
            />
          </span>
        </div>
      </div>
    );
  }
  return (
    <ClientOnly>
      <UserModal />
      <FriendsComponent friend={friend} />
    </ClientOnly>
  );
};

export default FriendsProfilePage;
