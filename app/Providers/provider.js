"use client";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
// ...
export function Providers({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "white",
          fontSize: "16px",
          width: "300px",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

// create a nextjs appp where you create posts that has postedby and bookedby field refferenced from the user model and has a istaken field thats boolean that updates when a another user that did not create the post clicks on a seen button.No other user can click on the seen button then use pusher to show the update in realtime,also have a chat model that has an aray named users that has refferences from user model and a messages field refference from the message model,a message model that has the senderId and recieverid refferenced from  user Model using pusher fro realtime messaging
