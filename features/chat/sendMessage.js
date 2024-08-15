import { global } from "@/actions";

export const send = async (
  currentId,
  postedorbookedById,
  message,
  setLoading,
  setUserState,
  messages
) => {
  let dataInfo = {
    sender: currentId,
    text: message,
    reciever: postedorbookedById,
  };
  console.log({ dataInfo: { dataInfo } });
  if (!message || !currentId || !postedorbookedById) {
    return;
  }
  try {
    setLoading(true);
    const response = await fetch("/api/chat/sendmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataInfo),
    });
    const data = await response.json();
    console.log(data);
    if (data.chatStatus === true) {
      setUserState({
        type: global.SETMESSAGES,
        payload: [...messages, data.message],
      });
      console.log("Message sent successfully");
    } else {
      console.log("Failed to send message");
    }
    message = "";
    setLoading(false);
  } catch (error) {
    console.error(error);
    alert("Failed to send message");
    throw error;
  } finally {
    setLoading(false);
  }
};
