export const handleLike = async (dep, id, current, setLikeLength, setLike) => {
  const res = await fetch(`/api/${dep}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  });
  const data = await res.json();
  console.log(data);
};

export const handleUnlike = async (
  dep,
  id,
  current,
  setLikeLength,
  setLike
) => {
  const res = await fetch(`/api/${dep}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  });
  const data = await res.json();
  console.log(data);
};

export const handledisLike = async (
  dep,
  id,
  current,
  setLikeLength,
  setdisLike
) => {
  const res = await fetch(`/api/${dep}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  });
  const data = await res.json();
  console.log(data);
};

export const handleUndislike = async (
  dep,
  id,
  current,
  setLikeLength,
  setdisLike
) => {
  const res = await fetch(`/api/${dep}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: postId,
    }),
  });
  const data = await res.json();
  console.log(data);
};
