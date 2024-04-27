import React from "react";

import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const UsersButton = ({
  onClick,
  title,
  className,
  image,
  span,
  link,
  loading,
  disabled,
  gigip,
}) => {
  return (
    <>
      {link ? (
        <div>
          <Link className={className} href={link}>
            {title}
          </Link>
        </div>
      ) : (
        <>
          {" "}
          {image && span ? (
            <button onClick={onClick} className={className}>
              <Image
                src={image}
                className="object-fit md:h-15 md:w-18 w-10 h-10 md:ml-4"
                alt="google play"
              />
              <div className="flex flex-col mt-1 justify-center items-center px-1">
                <span className="text-slate-800 text-sm md:text-1xl ">
                  {" "}
                  {span}
                </span>
                <span className="text-slate-800 text-sm md:font-bold md:text-1xl">
                  {" "}
                  {title}
                </span>
              </div>
            </button>
          ) : (
            <button
              disabled={disabled}
              type="button"
              onClick={onClick}
              className={className}
            >
              {!loading ? (
                title
              ) : (
                <CircularProgress size="30px" sx={{ color: "white" }} />
              )}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default UsersButton;
