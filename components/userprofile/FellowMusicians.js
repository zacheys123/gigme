import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { PropTypes } from "prop-types";
const FellowMusicians = ({ user, allUsers }) => {
  return (
    <div clasName=" ">
      {allUsers
        .filter((user) => user?.instrument?.length > 0)
        .map((user) => {
          console.log(user);
          return (
            <div key={user._id} className="">
              {user.picture && (
                <Image
                  width={80}
                  height={80}
                  className="w-[80px] h-[80px] rounded-full"
                  src={user.picture}
                  alt={user.username}
                />
              )}{" "}
              <p className="text-white my-2 font-bold">{user.username}</p>
            </div>
          );
        })}
    </div>
  );
};

export default FellowMusicians;
FellowMusicians.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.object,
};
