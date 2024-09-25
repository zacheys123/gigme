import ClientOnly from "@/app/ClientOnly";
import Chat from "@/components/chat/Chat";
import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
const getUser = async (params) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${params.usersearch}`
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
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getGig = async (params) => {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/gigs/getgig/${params.gigid}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const myOnline = async (params) => {
  try {
    const res = await fetch(`${checkEnvironment()}/api/online`);
    const { users } = await res.json();

    return users;
  } catch (error) {
    console.log(error);
  }
};

const ChatPage = async ({ params }) => {
  const { userId } = auth();
  const otherUser = await getUser(params);
  const currentUser = await getCurrentUser(userId);
  const myGig = await getGig(params);
  const Online = await myOnline();
  return (
    <ClientOnly>
      <Chat
        other={otherUser}
        curr={currentUser}
        getGig={myGig}
        onlineUsers={Online}
        // add online users to props to pass to the chat component, which will be fetched in the chat component's useEffect hook.
      />
      ;
    </ClientOnly>
  );
};

export default ChatPage;