import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
export function useCurrentUser(userId) {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/getuser/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);
  return { loading, user, setUser };
}
