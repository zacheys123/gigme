import Chat from "@/components/chat/Chat";
import { checkEnvironment } from "@/utils";
async function getUser(userId) {
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getChat(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`);
  return res.json();
}
const ChatPage = async ({ params }) => {
  const myChat = await getChat(params.id);
  const myUser = await getUser(params.usersearch);

  return <Chat myChat={myChat} myUser={myUser} />;
};

export default ChatPage;
