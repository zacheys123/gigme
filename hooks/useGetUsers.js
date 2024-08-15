import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
export function useGetUsers(setReciever, setSender, other, curr) {
  const [loading, setLoading] = useState();
  useEffect(() => {
    const getReciever = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/chat/getuserchat/${other}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const gigs = await res.json();
        setReciever(gigs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getReciever();
  }, [other, setReciever]);
  useEffect(() => {
    const getSender = async () => {
      try {
        const res = await fetch(`/api/chat/getuserchat/${curr}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const gigs = await res.json();
        setSender(gigs);
      } catch (error) {
        console.log(error);
      }
    };
    getSender();
  }, [curr, setSender]);

  return { loading };
}
