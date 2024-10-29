import "./globals.css";
import { auth, ClerkLoaded } from "@clerk/nextjs";
import { GlobalProvider } from "./Context/store";
import { Providers } from "./Providers/provider";
import { SocketContextProvider } from "./Context/socket";
import "@/lib/cron";
import { NotificationProvider } from "./Context/notificationContext";
export const metadata = {
  title: "GigMeApp",
  description: "Connect to Musicians",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <NotificationProvider>
        <GlobalProvider>
          <SocketContextProvider>
            <html lang="en">
              <body className="min-h-screen bg-gray-200 w-screen overflow-x-hidden ">
                {" "}
                <ClerkLoaded>{children} </ClerkLoaded>
              </body>
            </html>
          </SocketContextProvider>
        </GlobalProvider>
      </NotificationProvider>
    </Providers>
  );
}
