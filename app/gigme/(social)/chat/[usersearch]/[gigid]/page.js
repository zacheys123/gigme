import ClientOnly from "@/app/ClientOnly";
import Chat from "@/components/chat/Chat";
import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${checkEnvironment()}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const ChatPage = async ({ params }) => {
  await connectDb();

  const onlineUsers = await User.find({ isOnline: true });
  const { userId } = auth();

  const [otherUser, currentUser, myGig] = await Promise.all([
    fetchData(`/api/user/getuser/${params.usersearch}`),
    fetchData(`/api/user/getuser/${userId}`),
    fetchData(`/api/gigs/getgig/${params.gigid}`),
  ]);

  return (
    <ClientOnly>
      <Chat
        other={otherUser}
        curr={currentUser}
        getGig={myGig}
        onlineUsers={onlineUsers}
      />
    </ClientOnly>
  );
};

export default ChatPage;
// PropTypes validation for the children prop
ChatPage.propTypes = {
  params: PropTypes.node.isRequired, // Children must be a valid React node
};
