import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { Button } from "../ui/button";
import AvatarComponent from "../Avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import moment from "moment";
import { Badge } from "@mui/material";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
function ChatComponent({ chats }) {
  const { userId } = useAuth();
  const { user } = useCurrentUser(userId);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let chat = chats
    ?.map((ch) => ch)
    .filter((c) => c?.users[0]._id === user?.user?._id)
    .filter((c) => c?.users.includes(user?.user?._id));
  console.log(chat);
  const router = useRouter();
  let usequery = (c) => {
    if (c.users[0]._id === user?.user?._id) {
      return c.users[0]._id ? c.users[0]._id : c.users[1]._id;
    }
    if (c.users[0]._id === user?.user?._id) {
      return c.users[1] ? c.users[1] : c.users[0];
    }
  };

  return (
    <div>
      <button
        type="button"
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        onClick={handleClick}
      >
        <Badge
          badgeContent={user?.user?.followings.length}
          color="warning"
          sx={{ fontSize: "8px" }}
        >
          <BiSolidMessageRounded
            size="18px"
            className="text-gray-200  relative inline-flex items-center text-sm font-medium text-center   "
          />
        </Badge>
      </button>
      <div className="absolute">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {chats
            ?.filter((c) => usequery(c) === user?.user?._id)
            .map((c) => {
              console.log(usequery(c));
              return (
                <div
                  key={c?._id}
                  onClick={() =>
                    router.push(
                      `/gigme/chat/${usequery(c)}/${
                        c?.user[0]?.username
                      }12welcome`
                    )
                  }
                >
                  <MenuItem
                    onClick={handleClose}
                    className="h-[50xpx bg-red-500]"
                  >
                    <Button
                      className="flex gap-2 items-center"
                      variant="text"
                      size="small"
                      onClick={() => {
                        console.log(usequery(c));
                      }}
                    >
                      <AvatarComponent
                        usercomm={c}
                        posts="h-[15px] w-[15px] object-fit"
                      />
                      {usequery(c)?.firstname}
                    </Button>
                  </MenuItem>
                </div>
              );
            })}

          {/* <div className="" key={chat?._id}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </div>*/}
        </Menu>
      </div>
      {/* <div>
        <button
          type="button"
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
        >
          <Badge
            badgeContent={user?.user?.followings.length}
            color="warning"
            sx={{ fontSize: "8px" }}
          >
            <BiSolidMessageRounded
              size="18px"
              className="text-gray-200  relative inline-flex items-center text-sm font-medium text-center   "
            />
          </Badge>
        </button>
        {chats
          ?.filter((c) => c.users[1]._id === user?.user?._id)
          .map((c) => {
            return (
              <div
                id="dropdownNotification"
                className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                aria-labelledby="dropdownNotificationButton"
              >
                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                  All Chats
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  <Link
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0">
                      <AvatarComponent
                        usercomm={c?.users[0]}
                        posts="h-[15px] w-[15px] object-fit"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800"></div>
                    </div>
                    <div className="w-full ps-3">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        New message from{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {c?.users[0]?.firstname}
                        </span>
                        <span className="line-clamp-2">
                          {" "}
                          "Hey, what's up? All set for the presentation?"
                        </span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        {moment(c?.users[0]?.createdAt).calendar()}
                      </div>
                    </div>
                  </Link>
                </div>
                <a
                  href="#"
                  className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  {/* <div className="inline-flex items-center ">
      <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
      </svg>
        View all
    </div> */}
      {/* </a>
              </div>
            );
          })}
      </div> */}
    </div>
  );
}
export default ChatComponent;
