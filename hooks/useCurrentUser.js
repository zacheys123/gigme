"use client";

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
        const meuser = await res.json();
        if (meuser === null) {
          setUser({});
          throw new Error("User not found");
        }
        setUser(meuser);
        console.log(meuser);
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
