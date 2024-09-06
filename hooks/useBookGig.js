import { useState } from "react";

export function useBookGig() {
  const [bookloading, setLoading] = useState();
  // logic for useBookGig hook goes here
  const bookgig = async (rating, myGig, userId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/gigs/book/${myGig?.gigs?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to book the gig");
      }
      const data = await response.json();
      if (data.gigstatus === "true") {
        alert("Booked the gig successfully");
        console.log(data);
        route.push(`/gigme/gigs/${userId}`);
        setLoading(false);
      } else {
        alert(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error booking the gig:", error.message);
    }
  };
  return { bookloading, bookgig };
}
