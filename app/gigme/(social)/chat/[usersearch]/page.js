import Chat from "@/components/chat/Chat";
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
const ChatPage = async ({ params }) => {
  const { userId } = auth();
  const otherUser = await getUser(params);
  const currentUser = await getCurrentUser(userId);
  return <Chat other={otherUser} curr={currentUser} />;
};

export default ChatPage;
