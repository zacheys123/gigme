export const handleCreateGig = async () => {
  const res = await fetch(`/api/gigs/create/${user?.user?._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataInfo,
    }),
  });
  const data = await res.json();
  console.log(data);
};
