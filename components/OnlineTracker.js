import { useEffect } from "react";

export default function OnlineTracker({ userId }) {
  console.log(userId);
  useEffect(() => {
    const markUserOnline = async () => {
      const res = await fetch("/api/user/online", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        console.error("Failed to mark user as online");
      }
      console.log("User marked as online");
    };

    const markUserOffline = async () => {
      await fetch("/api/user/offline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    };

    // Mark user online when they open the app
    markUserOnline();

    // Set user as offline when they leave the page or close the app
    window.addEventListener("beforeunload", markUserOffline);

    // Optionally ping the server every minute to mark as online
    const interval = setInterval(markUserOnline, 60000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", markUserOffline);
      markUserOffline();
    };
  }, [userId]);

  return null;
}
