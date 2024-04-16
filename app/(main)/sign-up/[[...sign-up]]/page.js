import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" h-[100vh] bg-gray-200">
      <div className="flex justify-center items-center h-full">
        {" "}
        <SignUp />;
      </div>
    </div>
  );
}
