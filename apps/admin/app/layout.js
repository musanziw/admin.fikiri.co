import { Inter } from "next/font/google";
import "./ui/globals.css";
import { ContextProvider } from "./context/store";
import { NextAuthProvider } from "./context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fikiri | Dashboard",
  description: "Fikiri Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>
          <ContextProvider>{children}</ContextProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
