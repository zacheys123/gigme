import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import useStore from "@/app/zustand/useStore";
import { useEffect, useState } from "react";
export function useFetchMessages(currentId, postedorbookedById) {
  const [loading, setLoading] = useState();
  const [chat, setChat] = useState({});
  const url = `/api/chat/fetchchats/${currentId}/${postedorbookedById}`;

  const { setMessages, messages } = useStore();
  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      if (!currentId || !postedorbookedById) return [];
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setChat(data?.chat);
        setMessages(data?.chat?.messages);
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (postedorbookedById) getMessages();
  }, [url, currentId, postedorbookedById, setMessages]);

  return { loading, messages, chat };
}
