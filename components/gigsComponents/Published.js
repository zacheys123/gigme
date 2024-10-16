"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { CircularProgress, Divider } from "@mui/material";
import { classing, searchfunc } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import GigDescription from "./GigDescription";
import { Fullscreen } from "lucide-react";
import ButtonComponent from "../ButtonComponent";
import { Search } from "@mui/icons-material";
import Gigheader from "./Gigheader";
import useStore from "@/app/zustand/useStore";
import { PropTypes } from "prop-types";

import { io } from "socket.io-client";

const Published = ({ user }) => {
  const {
    setSearch,
    pubGigs,
    setPubGigs,
    setCreatedGigs,
    setIsbooked,
    isbooked,
  } = useStore();

  const { userId } = useAuth();
  const [typeOfGig, setTypeOfGig] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState();
  const [loadingview, setLoadingView] = useState();
  const [loadingbook, setLoadingBook] = useState();

  const [gigs, setGigs] = useState({});

  const [socket, setNewSocket] = useState("");

  const [location, setLocation] = useState(() =>
    user?.user?.city ? user?.user?.city : "nairobi"
  );

  let gigQuery;
  let currentUser = user?.user?._id;
  const getGigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gigs/getpub/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data?.gigs);
      setPubGigs(data?.gigs);
      setCreatedGigs(data?.gigs);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Socket.IO and handle real-time updates
  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setNewSocket(newSocket);

    newSocket.on("gig-booked", (updatedGig) => {
      console.log("Gig booked:", updatedGig);
      setGigs((prevGigs) =>
        prevGigs.map((gig) =>
          gig._id === updatedGig.results._id ? updatedGig.results : gig
        )
      );
      setIsbooked(updatedGig.results.isPending);
    });

    return () => {
      newSocket.disconnect(); // Clean up the socket on unmount
    };
  }, [setIsbooked]);

  useEffect(() => {
    getGigs();
  }, []);

  const router = useRouter();
  const [readmore, setReadMore] = useState();
  const [currentGig, setCurrentGig] = useState({});
  const [gigdesc, setGigdesc] = useState();
  const [open, setOpen] = useState();

  // Booking function it updates the isPending state ,only the logged in user access it
  const handleBook = async (gig) => {
    // update the isPending state
    if (!socket) {
      console.error("Socket not connected");
      return;
    }
    try {
      setLoadingBook(true);
      const res = await fetch(`/api/gigs/bookgig/${gig?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: user?.user?._id,
        }),
      });
      const data = await res.json();

      if (data.gigstatus === "true") {
        setLoadingBook(false);
        toast.success("Booked the gig successfully");

        router.push(`/gigme/mygig/${gig?._id}/execute`);
        socket.emit("book-gig", data);
        setLoading(false);
      } else {
        toast.error(data.message);
        router.push(`/gigme/gigs/${userId}`);
        router.refresh();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while booking.", error);
    } finally {
      setLoadingBook(false);
    }
  };
  console.log(gigs);
  // conditionsl styling
  const handleModal = (gig) => {
    setOpen(true);
    setGigdesc(true);
    setCurrentGig(gig);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("close", gigdesc);
  };

  return (
    <div className="w-full h-[calc(100vh-260px)] p-2 shadow-lg mt-3">
      {" "}
      {gigdesc && (
        <GigDescription
          gig={currentGig}
          open={open}
          handleClose={handleClose}
        />
      )}
      <Gigheader
        typeOfGig={typeOfGig}
        setTypeOfGig={setTypeOfGig}
        category={category}
        setCategory={setCategory}
        gigQuery={gigQuery}
        location={location}
        setLocation={setLocation}
        user={user}
      />
      <Divider sx={{ backgroundColor: "gray" }} />
      <br />
      <div
        onClick={() => setSearch(false)}
        className="gigdisplay shadow-lg shadow-yellow-600 w-full h-[100%] p-2 overflow-y-scroll element-with-scroll"
      >
        {!loading && pubGigs?.length === 0 && <div>No Gigs to display</div>}

        {!loading && pubGigs?.length > 0 ? (
          <>
            {/* content */}
            {searchfunc(pubGigs, typeOfGig, category, gigQuery, location)
              ?.filter((pub) => pub.isTaken === false)
              ?.map((gig) => {
                return (
                  <div key={gig?.secret} className=" flex w-full my-3 ">
                    <div className="flex ">
                      <div
                        className="w-full text-right "
                        onClick={() => handleModal(gig)}
                      >
                        <Fullscreen color="white" />
                      </div>
                    </div>
                    <div className={classing(gig, readmore)}>
                      <div className="flex ">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold">
                          Gig title:
                        </span>
                        <span
                          className={
                            Object.keys(gigs).length > 0 || !gig?.isPending
                              ? "titler text-red-700 font-bold"
                              : "titler font-bold text-yellow-200"
                          }
                        >
                          {gig?.title}
                        </span>
                      </div>
                      <div className="flex">
                        {" "}
                        <span className="gigtitle text-blue-500 font-bold">
                          Location:
                        </span>
                        <span
                          className={
                            Object.keys(gigs).length > 0 || !gig?.isPending
                              ? "titler text-red-700 font-bold line-clamp-2"
                              : "titler font-bold text-yellow-200 line-clamp-2"
                          }
                        >
                          {gig?.location}
                        </span>
                      </div>
                      {Object.keys(gigs).length > 0 ||
                        (!gig?.isPending && (
                          <div className="w-full text-right p-1 -my-2 ">
                            <ButtonComponent
                              variant="destructive"
                              classname=" h-[20px] text-[8px] m-2 font-bold"
                              onclick={() => handleBook(gig)}
                              title="Book Gig"
                            />
                          </div>
                        ))}
                      <div className="flex  align-start">
                        {" "}
                        <>
                          {gig?.isPending === true &&
                            gig?.bookedBy?.clerkId.includes(userId) &&
                            gig?.bookedBy?.firstname ===
                              user?.user?.firstname && (
                              <div className="w-full text-right">
                                <ButtonComponent
                                  variant="secondary"
                                  classname=" h-[20px] text-[8px] m-2 font-bold"
                                  onclick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                      setLoadingView(false);
                                      router.push(
                                        `/gigme/mygig/${gig?._id}/execute`
                                      );
                                    }, 3000);
                                  }}
                                  title="View Gig Details!!"
                                  loading={loadingview}
                                  loadingtitle="viewing..."
                                />
                              </div>
                            )}
                        </>
                      </div>
                      <Divider />{" "}
                      <div className="flex justify-between items-center mt-2">
                        <div
                          className={
                            gig?.isPending ? " flex " : "flex-1 w-[80%]"
                          }
                        >
                          {" "}
                          <div className=" w-[80%] flex">
                            <span
                              className={
                                Object.keys(gigs).length < 0 || !gig?.isPending
                                  ? " tracking-tighter font-bold text-red-400 text-[11px] mr-1"
                                  : " tracking-tighter font-bold text-white text-[11px] mr-1"
                              }
                            >
                              Status:
                            </span>
                            <div className="titler text-red-700 font-bold line-clamp-1 no-underline ">
                              {!gig?.isTaken ? (
                                <span
                                  className={
                                    Object.keys(gigs).length > 0 ||
                                    gig?.isPending == false
                                      ? " track-tighter bg-sky-500  p-2 rounded-full text-[11px]  text-white "
                                      : ""
                                  }
                                >
                                  {Object.keys(gigs).length < 0 ||
                                  gig?.isPending == false
                                    ? "Avaliable"
                                    : ""}
                                </span>
                              ) : (
                                <span className=" bg-green-500 p-2 rounded-full text-[11px]  text-white">
                                  Taken
                                </span>
                              )}
                            </div>
                          </div>
                          {!gig?.bookedBy?.clerkId.includes(userId) && (
                            <>
                              {Object.keys(gigs).length > 0 ||
                                (gig?.isPending && (
                                  <h6 className="titler bg-red-700 h-[24px] font-bold whitespace-nowrap text-white p-1 flex">
                                    Not Available for now
                                  </h6>
                                ))}
                            </>
                          )}
                        </div>
                        <div>
                          {" "}
                          <span className="titler text-red-700 font-bold line-clamp-1 ">
                            {gig?.postedBy?.picture && (
                              <Image
                                src={gig?.postedBy?.picture}
                                alt="p"
                                width={25}
                                height={25}
                                className="w-[25px] h-[25px] rounded-full"
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()}{" "}
          </>
        ) : (
          <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              {" "}
              <h6 className="gigtitle text-white">loading gigs...</h6>
              <CircularProgress size="15px" sx={{ color: "white" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Published;

Published.propTypes = {
  user: PropTypes.object.isRequired,
};

// import React, { useEffect, useState } from "react";

// import { useAuth } from "@clerk/nextjs";
// import { Input } from "../ui/input";
// import { CircularProgress, Divider } from "@mui/material";
// import { classing, searchfunc } from "@/utils";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// import { toast } from "sonner";
// import GigDescription from "./GigDescription";
// import { Fullscreen } from "lucide-react";
// import ButtonComponent from "../ButtonComponent";
// import { Search } from "@mui/icons-material";
// import Gigheader from "./Gigheader";
// import useStore from "@/app/zustand/useStore";
// import { PropTypes } from "prop-types";

// import { io } from "socket.io-client";

// const Published = ({ user }) => {
//   const {
//     setSearch,
//     pubGigs,
//     setPubGigs,
//     setCreatedGigs,
//     setIsbooked,
//     isbooked,
//   } = useStore();

//   const { userId } = useAuth();
//   const [typeOfGig, setTypeOfGig] = useState("");
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState();
//   const [loadingview, setLoadingView] = useState();
//   const [loadingbook, setLoadingBook] = useState();

//   const [gigs, setGigs] = useState([]);

//   const [socket, setNewSocket] = useState("");

//   const [location, setLocation] = useState(() =>
//     user?.user?.city ? user?.user?.city : "nairobi"
//   );

//   let gigQuery;
//   let currentUser = user?.user?._id;
//   const getGigs = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/gigs/getpub/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//       console.log(data?.gigs);
//       setPubGigs(data?.gigs);
//       setCreatedGigs(data?.gigs);
//       setLoading(false);
//       return data;
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize Socket.IO and handle real-time updates
//   useEffect(() => {
//     const newSocket = io("http://localhost:8080");
//     setNewSocket(newSocket);

//     newSocket.on("gig-booked", (updatedGig) => {
//       console.log("Gig booked:", updatedGig);
//       setGigs((prevGigs) =>
//         prevGigs.map((gig) =>
//           gig._id === updatedGig.results._id ? updatedGig.results : gig
//         )
//       );
//       setIsbooked(updatedGig.results.isPending);
//     });

//     return () => {
//       newSocket.disconnect(); // Clean up the socket on unmount
//     };
//   }, [setIsbooked]);

//   useEffect(() => {
//     getGigs();
//   }, []);

//   const router = useRouter();
//   const [readmore, setReadMore] = useState();
//   const [currentGig, setCurrentGig] = useState({});
//   const [gigdesc, setGigdesc] = useState();
//   const [open, setOpen] = useState();

//   // Booking function it updates the isPending state ,only the logged in user access it
//   const handleBook = async (gig) => {
//     // update the isPending state
//     if (!socket) {
//       console.error("Socket not connected");
//       return;
//     }
//     try {
//       setLoadingBook(true);
//       const res = await fetch(`/api/gigs/bookgig/${gig?._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userid: user?.user?._id,
//         }),
//       });
//       const data = await res.json();

//       if (data.gigstatus === "true") {
//         setLoadingBook(false);
//         toast.success("Booked the gig successfully");

//         router.push(`/gigme/mygig/${gig?._id}/execute`);
//         socket.emit("book-gig", data);
//         setLoading(false);
//       } else {
//         toast.error(data.message);
//         router.push(`/gigme/gigs/${userId}`);
//         router.refresh();
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An error occurred while booking.", error);
//     } finally {
//       setLoadingBook(false);
//     }
//   };
//   console.log(gigs);
//   // conditionsl styling
//   const handleModal = (gig) => {
//     setOpen(true);
//     setGigdesc(true);
//     setCurrentGig(gig);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     console.log("close", gigdesc);
//   };

//   return (
//     <div className="w-full h-[calc(100vh-260px)] p-2 shadow-lg mt-3">
//       {" "}
//       {gigdesc && (
//         <GigDescription
//           gig={currentGig}
//           open={open}
//           handleClose={handleClose}
//         />
//       )}
//       <Gigheader
//         typeOfGig={typeOfGig}
//         setTypeOfGig={setTypeOfGig}
//         category={category}
//         setCategory={setCategory}
//         gigQuery={gigQuery}
//         location={location}
//         setLocation={setLocation}
//         user={user}
//       />
//       <Divider sx={{ backgroundColor: "gray" }} />
//       <br />
//       <div
//         onClick={() => setSearch(false)}
//         className="gigdisplay shadow-lg shadow-yellow-600 w-full h-[100%] p-2 overflow-y-scroll element-with-scroll"
//       >
//         {!loading && pubGigs?.length === 0 && <div>No Gigs to display</div>}

//         {!loading && pubGigs?.length > 0 ? (
//           <>
//             {/* content */}
//             {searchfunc(pubGigs, typeOfGig, category, gigQuery, location)
//               ?.filter((pub) => pub.isTaken === false)
//               ?.map((gig) => {
//                 return (
//                   <div key={gig._id} className="flex w-full my-3">
//                     <div className="flex">
//                       <Fullscreen
//                         onClick={() => handleModal(gig)}
//                         color="white"
//                       />
//                     </div>
//                     <div className={classing(gig)}>
//                       <div className="flex">
//                         <span className="font-bold text-blue-500">
//                           Gig title:
//                         </span>
//                         <span className="font-bold text-red-700">
//                           {gig.title}
//                         </span>
//                       </div>
//                       <div className="flex">
//                         <span className="font-bold text-blue-500">
//                           Location:
//                         </span>
//                         <span className="font-bold text-red-700">
//                           {gig.location}
//                         </span>
//                       </div>
//                       <div className="flex justify-end">
//                         {gig.isPending &&
//                           gig?.bookedBy?._id === user?.user?._id && (
//                             <ButtonComponent
//                               variant="secondary"
//                               title="View Gig Details"
//                               onclick={() =>
//                                 router.push(`/gigme/mygig/${gig._id}/execute`)
//                               }
//                             />
//                           )}
//                         {!gig.isPending && (
//                           <ButtonComponent
//                             variant="destructive"
//                             title="Book Gig"
//                             onclick={() => handleBook(gig)}
//                             // loading={loadingBook}
//                           />
//                         )}
//                       </div>
//                       <div className="flex justify-between mt-2">
//                         <span
//                           className={
//                             gig.isTaken
//                               ? "bg-green-500 p-2 rounded-full text-white"
//                               : "bg-sky-500 p-2 rounded-full text-white"
//                           }
//                         >
//                           {gig.isPending ? "Taken" : "Available"}
//                         </span>
//                         {gig.postedBy?.picture && (
//                           <Image
//                             src={gig.postedBy.picture}
//                             alt="Poster"
//                             width={25}
//                             height={25}
//                             className="rounded-full"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//               .reverse()}{" "}
//           </>
//         ) : (
//           <div className="h-[calc(75vh-150px)] w-full flex justify-center items-center">
//             <div className="flex flex-col items-center gap-2">
//               {" "}
//               <h6 className="gigtitle text-white">loading gigs...</h6>
//               <CircularProgress size="15px" sx={{ color: "white" }} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Published;

// Published.propTypes = {
//   user: PropTypes.object.isRequired,
// };
