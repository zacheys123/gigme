import Link from "next/link";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://localhost:3000"; // https://v2ds.netlify.app

  return base_url;
};

export const differenceInMinutes = (post, today) => {
  let mydate = new Date(post?.createdAt);
  var diffMs = today - mydate; // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  if (diffDays === 1) {
    return diffDays + " day ago";
  } else if (diffDays > 1) {
    return diffDays + " days ago";
  } else if (diffHrs === 1) {
    return diffHrs + " hour ago";
  } else if (diffHrs > 1) {
    return diffHrs + " hours ago";
  } else if (diffMins === 1) {
    return diffMins + " minute ago";
  } else if (diffMins > 1) {
    return diffMins + " minutes ago";
  } else if (diffMins === 60) {
    return "1 hour ago";
  } else {
    return "just now";
  }
};

export function getLikes(posts, likeLength) {
  return "50 ";
}
export function getDisLikes(posts, likeLength) {
  return "50 ";
}
export function getComments(commentsarray, commentLength) {
  if (commentsarray?.length >= 1000) {
    return `${commentsarray?.length}k comments` || `${commentLength}k comments`;
  } else if (commentsarray?.length < 1 || commentLength < 1) {
    return "comment";
  } else if (commentsarray?.length > 1 || commentLength > 1) {
    return `${commentsarray?.length} comments` || `${commentLength}comments`;
  }
}

export const handleRouting = (post, user) => {
  if (post?.postedBy?.clerkId === user) {
    return (
      <Link href={`/v1/profile${user}/user`}>@{post?.postedBy?.username}</Link>
    );
  }
  return (
    <Link href={`/friends/${post?.postedBy?.username}`}>
      @{post?.postedBy?.username}
    </Link>
  );
};
