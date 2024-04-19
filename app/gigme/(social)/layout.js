import SocialNav from "@/components/SocialNav";
import React from "react";

const GigmeLayout = ({ children }) => {
  return (
    <div>
      <SocialNav />
      {children}
    </div>
  );
};

export default GigmeLayout;
