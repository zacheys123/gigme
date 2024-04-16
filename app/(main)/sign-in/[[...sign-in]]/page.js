import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" h-[100vh]">
      <div className="flex justify-center items-center h-full">
        {" "}
        <SignIn />;
      </div>
    </div>
  );
}
