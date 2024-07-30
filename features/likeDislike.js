export const handleLike = async (dep, id, setLikeLength, setLike) => {
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
  setLikeLength((prev) => prev + 1);
  setLike((prev) => !prev);
  console.log(data);
};

export const handleUnlike = async (dep, id, setLikeLength, setLike) => {
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
  setLikeLength((prev) => prev - 1);
  setLike((prev) => !prev);
  console.log(data);
};

export const handledisLike = async (dep, id, setdisLikeLength, setdisLike) => {
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
  setdisLike((prev) => !prev);
  console.log(data);
};

export const handleUndislike = async (
  dep,
  id,
  setdisLikeLength,
  setdisLike
) => {
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
};
