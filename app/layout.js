import QueryProvider from "@/components/provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "GigMeApp",
  description: "Connect to Musicians",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className="min-h-screen bg-gray-200 ">{children}</body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
