import ReplyComponent from "@/components/postComponents/ReplyComponent";
import { checkEnvironment } from "@/utils";
async function getComments(params) {
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/comments/getComment/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  console.log(replies);

  return (
    <div className="h-screen w-screen  bg-neutral-300">
      <ReplyComponent comment={comment} replies={replies} />
    </div>
  );
};

export default ReplyPage;
