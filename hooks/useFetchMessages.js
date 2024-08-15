import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
export function useFetchMessages(currentId, postedorbookedById, setMessages) {
  const [loading, setLoading] = useState();
  const url = `/api/chat/fetchchats/${currentId}/${postedorbookedById}`;

  const {
    userState: { messages },
    setUserState,
  } = useGlobalContext();
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

        setUserState({ type: global.GETMESSAGES, payload: data.chat });
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (postedorbookedById) getMessages();
  }, [url, setUserState, currentId, postedorbookedById]);

  return { loading, messages };
}
