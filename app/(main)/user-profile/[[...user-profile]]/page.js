import { UserProfile } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
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
