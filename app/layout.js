import QueryProvider from "@/components/provider";
import "./globals.css";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { GlobalProvider } from "./Context/store";
export const metadata = {
  title: "GigMeApp",
  description: "Connect to Musicians",
};

export default function RootLayout({ children }) {
  const handleTokenRefreshError = (error) => {
    if (error.message === "Failed to load Clerk") {
      console.error("Token refresh failed");
    }
  };
  return (
    <ClerkProvider>
      <QueryProvider>
        <GlobalProvider>
          <html lang="en">
            <body className="min-h-screen bg-gray-200 ">
              {" "}
              <ClerkLoaded>{children} </ClerkLoaded>
            </body>
          </html>
        </GlobalProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
