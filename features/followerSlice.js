export const updateFollowers = async (data, id, setFollow) => {
  console.log(id);
  try {
    const res = await fetch(`/api/user/friendactions/${data?.user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: id,
    });
    const followersData = await res.json();
    console.log(followersData);
  } catch (error) {
    console.log(error);
  }
  setFollow((prev) => !prev);
};
