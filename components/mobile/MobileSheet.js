import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Menu, Music, Search, Settings } from "lucide-react";
import { Chat } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";
const MobileSheet = () => {
  return (
    <Sheet className="w-100 bg-gray-500">
      <SheetTrigger>
        <Menu className="font-extrabold text-neutral-600" />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="w-100 flex flex-row gap-2 justify-around items-center"
      >
        <SheetHeader className="flex flex-col items-center">
          {" "}
          <Home />
          <SheetDescription>Dashboard</SheetDescription>
        </SheetHeader>
        <SheetHeader className="flex flex-col items-center">
          <Search /> <SheetDescription>Search</SheetDescription>
        </SheetHeader>
        <SheetHeader className="flex flex-col items-center">
          <Music /> <SheetDescription>Gigs</SheetDescription>
        </SheetHeader>{" "}
        <SheetHeader className="flex flex-col items-center">
          <Chat /> <SheetDescription>Chat</SheetDescription>
        </SheetHeader>{" "}
        <SheetHeader className="flex flex-col items-center">
          <Settings /> <SheetDescription>Settings</SheetDescription>
        </SheetHeader>{" "}
        <SheetHeader>
          <UserButton afterSignOutUrl="/" className="" />
        </SheetHeader>{" "}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
