import React from "react";

const ChatPage = () => {
  const messages = [
    {
      uniqid: "ijfsnfsfshjnfbfbfuffoibiygfus",
      bookedid: "1",
      text: "hellow mister mann",
      time: "12:40pm",
    },
    {
      uniqid: "ijfsnfsfshtyu35oibiygfus",
      bookedid: "2",
      text: "hellow mwanake",
      time: "12:42pm",
    },
    {
      uniqid: "ijfsnsdarety6oibiygfus",
      bookedid: "1",
      text: "how have you been?",
      time: "12:45pm",
    },
    {
      uniqid: "ijfsnfs12jufsbnmbiygfus",
      bookedid: "1",
      text: "how have you been?",
      time: "12:45pm",
    },

    {
      uniqid: "ijfs1735mnbmhmibiygfus",
      bookedid: "2",
      text: "ive been great",
      time: "1:40pm",
    },
    {
      uniqid: "ijfsnfs12467bxvbiygfus",
      bookedid: "1",
      text: "i want that gig",
      time: "2:40pm",
    },
    {
      uniqid: "ijf987ffgfgbiygfus",
      bookedid: "2",
      text: "okay,i have given you.",
      time: "3:00pm",
    },
    {
      uniqid: "ijfs121i8987vfgfgbiygfus",
      bookedid: "2",
      text: "ive been great",
      time: "1:40pm",
    },

    {
      uniqid: "fgrfsdgrwt4545bxvbiygfus",
      bookedid: "1",
      text: "i want that gig",
      time: "2:40pm",
    },
    {
      uniqid: "fht56sfffiygfus",
      bookedid: "2",
      text: "okay,i have given you.",
      time: "3:00pm",
    },
    {
      uniqid: "i12254dfsfghffjjiygfus",
      bookedid: "2",
      text: "ive been great",
      time: "1:40pm",
    },
  ];
  return (
    <div className="overflow-y-auto shadow-md shadow-zinc-100  border border-input  rounded-md element-with-scroll flex-1  p-2">
      {messages
        .map((message) => (
          <div key={message.uniqid} className="w-full h-[35px]  my-5">
            {/* {message.postedBy.clerkId.includes(userId)} */}
            {message.bookedid === "1" && (
              <div className="flex items-end">
                <div className="flex flex-col items-start  my-2">
                  <h6 className=" outgoing-msg     flex flex-col    p-3 rounded-xl text-[11px] md:text-[13px]">
                    <span>{message.text}</span>
                    <span className="text-neutral-200 text-[10px] link ">
                      {message.time}
                    </span>{" "}
                  </h6>
                </div>
              </div>
            )}
            {message.bookedid === "2" && (
              <div className="flex items-end justify-end">
                <div className="flex flex-col items-end  my-2">
                  <h6 className=" flex flex-col recieved-msg   p-3 rounded-xl text-[11px] md:text-[13px]">
                    <span>{message.text}</span>
                    <span className="text-neutral-500 text-[10px] link ">
                      {message.time}
                    </span>{" "}
                  </h6>
                </div>
              </div>
            )}
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default ChatPage;
