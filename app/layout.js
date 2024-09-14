import QueryProvider from "@/components/provider";
import "./globals.css";
import { auth, ClerkLoaded } from "@clerk/nextjs";
import { GlobalProvider } from "./Context/store";
import { Providers } from "./Providers/provider";
export const metadata = {
  title: "GigMeApp",
  description: "Connect to Musicians",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
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
    </Providers>
  );
}
