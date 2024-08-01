import Chat from "@/components/chat/Chat";
import { checkEnvironment } from "@/utils";
async function getUser() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getMyGig(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`);
  return res.json();
}
const ChatPage = async ({ params }) => {
  const myGig = await getMyGig(params.id);
  const myUser = await getUser(params.usersearch);

  return <Chat myGig={myGig} myUser={myUser} />;
};

export default ChatPage;
