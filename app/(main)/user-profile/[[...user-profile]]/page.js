import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
const UserProfilePage = () => {
  return (
    <div>
      {" "}
      <UserProfile
        path="/user-profile"
        appearance={{
          baseTheme: [dark],
          variables: { colorPrimary: "red" },
        }}
      />
    </div>
  );
};
export default UserProfilePage;
