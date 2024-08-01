import Chat from "@/components/chat/Chat";
import { checkEnvironment } from "@/utils";

async function getMyGig(gigId) {
  const res = await fetch(`${checkEnvironment()}/api/gigs/getgig/${gigId}`);
  return res.json();
}
const ChatPage = async ({ params }) => {
  const myGig = await getMyGig(params.id);

  return <Chat myGig={myGig} />;
};

export default ChatPage;
