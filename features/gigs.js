export const handleCreateGig = async (gigdata, setLoading) => {
  const res = await fetch(`/api/gigs/create/${user?.user?._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gigdatadata,
    }),
  });
  const data = await res.json();
  console.log(data);
};
