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
