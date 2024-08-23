import React from "react";

const EmojiContainer = ({ children }) => {
  return (
    <div className="w-[130%] h-[200px] overflow-y-auto absolute top-10 mx-auto bg-[#252525]">
      {children}
    </div>
  );
};

export default EmojiContainer;
