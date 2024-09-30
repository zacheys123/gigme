import { global } from "@/actions";

export const updateFollowers = async (
  data,
  id,
  setFollow,
  setUserState,
  setFollowersLength
) => {
  console.log(id);
  setFollowersLength((prev) => prev + 1);
  setFollow(true);
  setUserState({ type: global.LOADINGTRUE, payload: true });

  try {
    const res = await fetch(`/api/user/follower/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: id }),
    });

    const followersData = await res.json();
    setFollowersLength(followersData?.result?.followers.length);
  } catch (error) {
    setFollow((prev) => !prev);
    // setFollowersLength(f === f);
    console.log(error);
  } finally {
    setUserState({ type: global.LOADING, payload: false });
  }
};
export const updateFollowing = async (data, id, setUserState) => {
  console.log(id);
  try {
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/following/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following: id }),
    });
    const followingData = await res.json();
    console.log(followingData);
  } catch (error) {
    console.log(error);
  }
};

export const unFollower = async (
  data,
  id,
  setFollow,
  setUserState,
  setFollowersLength
) => {
  console.log(id);
  try {
    setFollowersLength((prev) => prev - 1);
    setFollow(false);
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/unfollower/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: id }),
    });
    const followersData = await res.json();
  } catch (error) {
    setFollow((prev) => !prev);

    console.log(error);
  } finally {
    setUserState({ type: global.LOADING, payload: false });
  }
};
export const unFollowing = async (data, id, setUserState) => {
  console.log(id);
  try {
    setUserState({ type: global.LOADINGTRUE, payload: true });
    const res = await fetch(`/api/user/unfollowing/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following: id }),
    });
    const followingData = await res.json();
    console.log(followingData);
  } catch (error) {
    console.log(error);
  } finally {
    setUserState({ type: global.LOADING, payload: false });
  }
};
