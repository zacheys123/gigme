import { global } from "@/actions";

export const send = async (
  currentId,
  postedorbookedById,
  message,
  setLoading,
  setMessages,
  gigId,
  setText,
  messages,
  socket,
  setIsLoaded
) => {
  let dataInfo = {
    sender: currentId,
    text: message.trim(),
    reciever: postedorbookedById,
    gigChat: gigId?.gigs?._id,
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
    // Ensure the socket is initialized and available
    console.log(socket);
    if (socket && typeof socket.emit === "function") {
      socket.emit("sendMessage", data.message, (error) => {
        if (error) {
          console.log("Message send error:", error);
        }
        setMessages([...messages, error]);
      });
    } else {
      console.error("Socket is not initialized or emit is not a function");
    }

    setIsLoaded(true);
    setText("");
    console.log(data);
    if (response.ok) {
      console.log(data.message);
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
