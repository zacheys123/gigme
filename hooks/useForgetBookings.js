import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import useStore from "@/app/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSocket from "./useSocket";
export function useForgetBookings() {
  const [loading, setLoading] = useState();
  const route = useRouter();
  const { socket } = useSocket();
  const forgetBookings = async (userId, myGig) => {
    try {
      if (!socket) {
        console.error("Socket not connected");
        return;
      }
      setLoading(true);
      const response = await fetch(`/api/gigs/cancelgig/${myGig?.gigs?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to cancel the gig");
      }
      const data = await response.json();
      socket.emit("cancel-gig", data);
      socket.emit("book-gig", data);

      if (data.gigstatus === "true") {
        toast.success("Cancelled the gig successfully");
        console.log(data);
        route.back();
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error canceling the gig:", error.message);
    }
  };
  return { loading, forgetBookings };
}
