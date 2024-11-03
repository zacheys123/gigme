import { cache } from "react";

export const handlebook = async (
  gig,
  myId,
  socket,
  publishedGigs,
  setLoading,
  userId,
  toast,
  router
) => {
  const countUserPosts = publishedGigs?.filter(
    (gig) => gig?.bookedBy?._id === myId && gig?.isPending === true
  ).length;
  console.log(countUserPosts);
  //... your logic here
  if (!socket) {
    console.error("Socket not connected");
    return;
  }
  if (countUserPosts > 2) {
    toast.error("You have reached your maximum booking limit");
    return;
  }
  try {
    setLoading(true);
    const res = await fetch(`/api/gigs/bookgig/${gig}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: myId,
      }),
    });
    const data = await res.json();

    if (data.gigstatus === "true") {
      toast.success("Booked the gig successfully");
      socket.emit("book-gig", data);
      router.push(`/gigme/mygig/${gig}/execute`);
    } else {
      toast.error(data.message);
      router.push(`/gigme/gigs/${userId}`);
      router.refresh();
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to book the gig. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const getGigs = async (
  userId,
  publishedGigsFunc,
  createdGigsFunc,
  setLoading,
  apiroute
) => {
  setLoading(true);
  try {
    let url = "";
    if (apiroute === "getpub") {
      url = `/api/gigs/getpub/${userId}`;
    } else if (apiroute === "allgigs") {
      url = `/api/gigs/allgigs`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate", // Avoid caching
      },
      cache: "no-store", // Avoid caching
    });

    const data = await res.json();
    console.log(data?.gigs);
    publishedGigsFunc(data?.gigs);
    createdGigsFunc(data?.gigs);
    setLoading(false);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
