export const handleLike = async (dep, id, setLikeLength, setLike, socket) => {
  setLike(true);
  try {
    setLikeLength((prev) => prev + 1);
    const res = await fetch(`${dep}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    const data = await res.json();
    const newLikeCount = data?.mylikes?.likes?.length;
    setLikeLength(newLikeCount);
    socket.emit("like", {
      postId: dep.split("/").pop(),
      likesCount: newLikeCount,
    });

    console.log(dep.split("/").pop());
  } catch (error) {
    setLike((prev) => !prev);
    console.error("Error liking the post:", error);
  }
};

export const handleUnlike = async (dep, id, setLikeLength, setLike, socket) => {
  setLike(false);
  try {
    setLikeLength((prev) => prev - 1);
    const res = await fetch(`${dep}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    const data = await res.json();
    const newLikeCount = data?.mylikes?.likes?.length;
    setLikeLength(newLikeCount);
    socket.emit("unlike", {
      postId: dep.split("/").pop(),
      likesCount: newLikeCount,
    });

    console.log(dep.split("/").pop());
  } catch (error) {
    setLike((prev) => !prev);
  }
};

export const handledisLike = async (dep, id, setdisLikeLength, setdisLike) => {
  setdisLike(true);
  try {
    const res = await fetch(`${dep}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    const data = await res.json();
    setdisLikeLength((prev) => prev + 1);

    console.log(data);
  } catch (error) {
    setdisLike((prev) => !prev);
  }
};

export const handleUndislike = async (
  dep,
  id,
  setdisLikeLength,
  setdisLike
) => {
  setdisLike(false);
  try {
    const res = await fetch(`${dep}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    const data = await res.json();
    setdisLikeLength((prev) => prev - 1);
    setdisLike((prev) => !prev);
    console.log(data);
  } catch (error) {
    setdisLike((prev) => !prev);
  }
};
