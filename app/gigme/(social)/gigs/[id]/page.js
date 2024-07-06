import Transition from "@/components/Transition";
import MainPage from "@/components/gigsComponents/MainPage";
import { checkEnvironment } from "@/utils";
import { auth } from "@clerk/nextjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
async function getUser() {
  const { userId } = auth();
  try {
    const res = await fetch(`${checkEnvironment()}/api/user/getuser/${userId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
const GigPage = async () => {
  const user = await getUser();
  return <MainPage user={user} />;
};

export default GigPage;
