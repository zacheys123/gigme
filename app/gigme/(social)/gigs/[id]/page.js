import ClientOnly from "@/app/ClientOnly";
import Transition from "@/components/Transition";
import MainPage from "@/components/gigsComponents/MainPage";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
async function getUser() {
  const { userId } = auth();
  try {
    const res = await fetch(
      `${checkEnvironment()}/api/user/getuser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
const GigPage = async () => {
  const user = await getUser();
  return (
    <div className="overflow-hidden h-screen w-screen">
      <MainPage user={user} />
    </div>
  );
};

export default GigPage;
