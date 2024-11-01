import ClientOnly from "@/app/ClientOnly";
import ReplyComponent from "@/components/postComponents/ReplyComponent";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
async function getUser() {
  const { userId } = auth();
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getComments(params) {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/comments/getComment/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const comment = await res.json();

    return comment;
  } catch (error) {
    console.log(error);
  }
}
async function getReplies() {
  try {
    const res = await fetch(`${checkEnvironment()}/api/reply/getReplies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const replies = await res.json();

    return replies;
  } catch (error) {
    console.log(error);
  }
}
const ReplyPage = async ({ params }) => {
  const comment = await getComments(params);
  const replies = await getReplies();
  const user = await getUser();
  console.log("Replies from API:", replies);

  return (
    <div className="h-fit w-screen bg-neutral-900 overflow-hidden">
      <ReplyComponent comment={comment} replies={replies} user={user} />
    </div>
  );
};

export default ReplyPage;
