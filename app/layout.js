import "./globals.css";
import { ThemeModeScript } from "flowbite-react";

import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "GigMeApp",
  description: "Connect to Musicians",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-100 ">{children}</body>
      </html>
    </ClerkProvider>
  );
}
