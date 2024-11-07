import Chat from "@/components/chat/Chat";
import PropTypes from "prop-types"; // Import PropTypes
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import React from "react";
const getUser = async (params) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${params.usersearch}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ChatPage = async ({ params }) => {
  const { userId } = auth();
  const otherUser = await getUser(params);
  const currentUser = await getCurrentUser(userId);

  let par = params.gigid;
  return (
    <Chat
      other={otherUser}
      curr={currentUser}
      getGig={par}

      // add online users to props to pass to the chat component, which will be fetched in the chat component's useEffect hook.
    />
  );
};

export default ChatPage;

// PropTypes validation for the children prop
ChatPage.propTypes = {
  params: PropTypes.node.isRequired, // Children must be a valid React node
};
