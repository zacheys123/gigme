import { global } from "@/actions";

export const updateFollowers = async (
  data,
  id,
  setRefetch,
  setFollow,
  setUserState
) => {
  console.log(id);
  setUserState({ type: global.LOADINGTRUE, payload: true });

  try {
    const res = await fetch(`/api/user/follower/${data?.user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: id }),
    });

    const followersData = await res.json();
    console.log(followersData);
    setRefetch(true);
    setFollow(true);
    setUserState({ type: global.LOADING, payload: false });
  } catch (error) {
    console.log(error);
  }
};
export const updateFollowing = async (
  data,
  id,
  setRefetch,
  setFollow,
  setUserState
) => {
  console.log(id);
  try {
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/following/${data?.user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following: id }),
    });
    const followingData = await res.json();
    console.log(followingData);
    setRefetch(true);
    setFollow((prev) => !prev);
    setUserState({ type: global.LOADING, payload: false });
  } catch (error) {
    console.log(error);
  }
  (prev) => prev;
};

export const unFollower = async (
  data,
  id,
  setRefetch,
  setFollow,
  setUserState
) => {
  console.log(id);
  try {
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/unfollower/${data?.user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: id }),
    });
    const followersData = await res.json();
    console.log(followersData);
    setRefetch(true);
    setFollow(true);
    setUserState({ type: global.LOADING, payload: false });
  } catch (error) {
    console.log(error);
  }
};
export const unFollowing = async (
  data,
  id,
  setRefetch,
  setFollow,
  setUserState
) => {
  console.log(id);
  try {
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/unfollowing/${data?.user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following: id }),
    });
    const followingData = await res.json();
    console.log(followingData);
    setRefetch(true);
    setFollow((prev) => !prev);
    setUserState({ type: global.LOADING, payload: false });
  } catch (error) {
    console.log(error);
  }
  (prev) => prev;
};
