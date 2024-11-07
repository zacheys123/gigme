import { SignIn } from "@clerk/nextjs";
import React from "react";
import PropTypes from "prop-types";
export default async function Page({ searchParams }) {
  const { redirectUrl } = searchParams;
  return (
    <div className=" h-[calc(100vh-60px)] bg-black overflow-hidden w-full">
      <div className="flex justify-center items-center h-full w-full shadow-slate-700 shadow-xl">
        <SignIn redirectUrl={redirectUrl || "/"} />;
      </div>
    </div>
  );
}
Page.propTypes = {
  searchParams: PropTypes.shape({
    redirectUrl: PropTypes.string,
  }).isRequired,
};
