import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" h-[100vh] bg-yellow-300">
      <div className="flex justify-center items-center h-full">
        {" "}
        <SignIn />;
      </div>
    </div>
  );
}
