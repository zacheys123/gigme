import GigDisplay from "@/components/userprofile/GigDisplay";
import ProfileComponent from "@/components/userprofile/ProfileComponent";

export const dataObject = {
  //   people that follow me functionality
  followers: (user, allUsers, router) => {
    let data = allUsers
      ?.filter((userd) => user?.user?.followers.includes(userd?._id))
      .map((otheruser) => (
        <ProfileComponent
          key={otheruser?._id}
          otheruser={otheruser}
          user={user}
          router={router}
          maindiv=" w-[150px] bg-slate-400 shadow-sm shadow-yellow-500 p-4 rounded-md my-2 mx-6 h-[135px] hover:scale-110 transition-transform duration-75"
          thirdDiv="w-full flex justify-center  items-center flex-col"
          image="w-[55px] h-[55px] rounded-full text-center"
          imageno={55}
        />
      ));

    return data;
  },
  //   musicaians functionality
  musicians: (user, allUsers, router) => {
    let data = allUsers
      ?.filter((userd) => userd?.instrument?.length > 0)
      .map((otheruser) => (
        <ProfileComponent
          key={otheruser?._id}
          otheruser={otheruser}
          user={user}
          router={router}
          maindiv=" w-[150px] bg-slate-400 shadow-sm shadow-yellow-500 p-4 rounded-md my-2 mx-6 h-[135px] hover:scale-110 transition-transform duration-75"
          thirdDiv="w-full flex justify-center  items-center flex-col"
          image="w-[57px] h-[57px] rounded-full text-center object-contain"
          imageno={57}
        />
      ));

    return data;
  },
  //   gigs I've posted functionality
  posted: (user, allGigs, router) => {
    let data = allGigs?.gigs
      ?.filter((g) => g?.postedBy?._id.includes(user?.user?._id))
      .map((gig) => (
        <GigDisplay
          gig={gig}
          gigdescription={gig?.postedBy}
          router={router}
          secondDiv="flex  gap-4 m-4 "
          image="h-[35px] w-[35px] rounded-full"
          thirdDiv="xl:w-[300px] flex items-center justify-between  bg-gray-400 rounded-md h-[100px] whitespace-nowrap  p-1 min-w-[190px]  hover:bg-gray-300 transition-all tansition-transform hover:scale-110 ease-in-out duration-75"
          title="text-[13px] font-bold"
          imageno={27}
        />
      ));

    return data;
  },
  //   gigs I've booked functionality
  booked: (user, allGigs, router) => {
    let data = allGigs?.gigs
      ?.filter((g) => g?.bookedBy?._id.includes(user?.user?._id))
      .map((gig) => (
        <GigDisplay
          gig={gig}
          gigdescription={gig?.bookedBy}
          router={router}
          secondDiv="flex  gap-4 m-4 "
          image="h-[35px] w-[35px] rounded-full"
          thirdDiv="xl:w-[300px] flex items-center justify-between  bg-gray-400 rounded-md h-[100px] whitespace-nowrap  p-1 min-w-[190px]  hover:bg-gray-300 transition-all tansition-transform hover:scale-110 ease-in-out duration-75"
          title="text-[13px] font-bold"
          imageno={27}
        />
      ));

    return data;
  },
  //   all gigs  functionality
  allgigs: (user, allGigs, router) => {
    let data = allGigs?.gigs
      ?.filter((g) => g?.isTaken === false)
      .map((gig) => (
        <GigDisplay
          gig={gig}
          gigdescription={gig?.bookedBy || gig?.postedBy}
          router={router}
          secondDiv="flex  gap-4 m-4 "
          image="h-[35px] w-[35px] rounded-full object-fit"
          thirdDiv="xl:w-[300px] flex items-center justify-between  bg-gray-400 rounded-md h-[100px] whitespace-nowrap  p-1 min-w-[190px]  hover:bg-gray-300 transition-all tansition-transform hover:scale-110 ease-in-out duration-75"
          title="text-[13px] font-bold"
          imageno={35}
          pendingStatus={gig?.isPending === true ? "booked" : ""}
        />
      ));

    return data;
  },
};
