import Link from "next/link";

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "gigme-pied.vercel.app"; // https://v2ds.netlify.app

  return base_url;
};
const getDays = (days) => {
  // let month = [];
  // month.push(days);
  // console.log(month);

  // let m = month.forEach((mth) => {
  //   let week = `${mth[0] > 7 && mth[0] > 7 &&  Math.ceil(mth[0]/7)}week ago`
  //    let month = `${mth[0] > 30 && Math.ceil(mth[0] / 7)}week ago`;
  //   return mth[0];
  // });
  if (days === 1) {
    return days + " day ago";
  } else if (days > 1 && days < 7) {
    return `${Math.ceil(days / 7)} week ago`;
  } else if (days > 11 && days < 13) {
    return `${Math.ceil(14 / 7)} week ago`;
  } else if (days > 18 && days < 20) {
    return `${Math.ceil(days / 7)} weeks ago`;
  } else if (days > 23 && days < 25) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days > 30 && days < 60) {
    return `${Math.floor(days / 30)} month ago`;
  } else if (days > 60 && days < 70) {
    return `${Math.floor(days / 30)} months ago`;
  } else if (days > 70 && days < 100) {
    return `${Math.floor(days / 30)} months ago`;
  }
};

export const differenceInMinutes = (post, today) => {
  let d;
  let mydate = new Date(post?.createdAt);
  var diffMs = today - mydate; // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  d = getDays(diffDays);
  if (diffDays) {
    return d;
  }
  if (diffHrs === 1) {
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
export const diff = (post, today) => {
  let d;
  let mydate = new Date(post);
  var diffMs = today - mydate; // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  d = getDays(diffDays);
  if (diffDays) {
    return d;
  }
  if (diffHrs === 1) {
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
  if (posts?.likes?.length > 1000) {
    return posts?.likes?.length < 0
      ? likeLength + "k"
      : `${posts?.likes?.length / 1000}k`;
  } else if (posts?.likes?.length < 1) {
    return posts?.likes?.length < 1 ? likeLength : posts?.likes?.length;
  } else if (posts?.likes?.length === 0 || likeLength === 0) {
    return "";
  } else {
    return likeLength || posts?.likes?.length;
  }
}
export function getDisLikes(posts, dislikeLength) {
  if (posts?.dislikes?.length > 1000) {
    return posts?.dislikes?.length < 0
      ? dislikeLength / 1000 + "k"
      : `${posts?.dislikes?.length / 1000}k`;
  } else if (posts?.dislikes?.length < 1) {
    return posts?.dislikes?.length < 1
      ? dislikeLength
      : posts?.dislikes?.length;
  } else if (posts?.dislikes?.length === 0 || dislikeLength === 0) {
    return "";
  } else {
    return dislikeLength || posts?.dislikes?.length;
  }
}

export function getComments(commentsarray, commentLength) {
  if (commentsarray?.length >= 1000) {
    return (
      `${commentsarray?.length / 1000}k comments` ||
      `${commentLength / 1000}k comments`
    );
  } else if (commentsarray?.length < 1 || commentLength < 1) {
    return "comment";
  } else if (commentsarray?.length > 1 || commentLength > 1) {
    return `${commentsarray?.length} comments` || `${commentLength}comments`;
  }
}
export function getReplys(replarray, replyLength) {
  if (replarray?.length >= 1000) {
    return (
      `${replarray?.length / 1000}k replies` || `${replyLength / 1000}k replies`
    );
  } else if (replarray?.length < 1 || replyLength < 1) {
    return "no reply";
  } else if (replarray?.length > 1 || replyLength > 1) {
    return `${replarray?.length} replies` || `${replyLength}replies`;
  } else if (replarray?.length === 1 || replyLength === 1) {
    return `${replarray?.length} reply` || `${replyLength}reply`;
  }
  return `${replarray?.length} replies` || `${replyLength}replies`;
}

export const handleRouting = (post, user) => {
  if (post?.postedBy?.clerkId === user) {
    return (
      <Link href={`/v1/profile/${user}/user`} className="link">
        @{post?.postedBy?.username}
      </Link>
    );
  }
  return (
    <Link href={`/friends/${post?.postedBy?.username}`} className="link">
      @{post?.postedBy?.username}
    </Link>
  );
};

function gigme(query, data, sorted) {
  if (data?.location?.toLowerCase().includes(query.toLowerCase())) {
    return sorted;
  } else if (
    data?.time?.from?.toLowerCase().includes(query.toLowerCase()) ||
    data?.time?.to?.toLowerCase().includes(query.toLowerCase())
  ) {
    return sorted;
  } else if (data?.title?.toLowerCase().includes(query.toLowerCase())) {
    return sorted;
  }
}
export const searchfunc = (data, searchquery, category, gigQuery, location) => {
  let sortedData = data;

  sortedData = sortedData?.filter((gig) => {
    if (searchquery) {
      gigQuery = gigme(searchquery, gig, sortedData);
      return gigQuery;
    } else {
      if (
        gig?.category &&
        gig?.category?.toLowerCase() === category?.toLowerCase()
      ) {
        return sortedData;
      } else if (gig.bussinesscat?.toLowerCase() === category?.toLowerCase()) {
        return sortedData;
      } else if (
        category.toLowerCase() === "all" &&
        gig?.location?.toLowerCase().includes(location.toLowerCase())
      ) {
        console.log(location);
        return sortedData;
      } else if (
        category.toLowerCase() === "all" &&
        location.toLowerCase() === "all"
      ) {
        return data;
      }
    }
    if (location) {
      if (gig?.location?.toLowerCase().includes(location.toLowerCase())) {
        return sortedData;
      }
    }
  });

  return sortedData;
};

export const classing = (gig, readmore) => {
  const normalstyling =
    "w-[300px]  p-3  bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
  // : "w-[440px]  p-3   border-2 blur-3 border-red-400 rounded-tl-md  rounded-tr-xl rounded-br-xl rounded-bl-xl";
  const readmorestyling =
    "w-[300px] h-fit p-3 bg-neutral-100  shadow-lg rounded-tl-md rounded-tr-xl rounded-br-xl rounded-bl-xl";
  const pending =
    "border-4 border-red-300 w-[300px] bg-neutral-400 rounded-xl h- shadow-md shadow-red-500 p-3";
  if (gig?.isPending) {
    return pending;
  }
  return `${readmore}  ?  ${readmorestyling} :  ${normalstyling}`;
};

export function formattedtime(datestring) {
  const date = new Date(datestring);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function padZero(number) {
  return String(number).padStart(2, "0");
}
