"use client";
import dynamic from "next/dynamic";
import "./globals.css";
const DynmaicLayout = dynamic(() => import("./index"), {
  ssr: false,
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DynmaicLayout>{children}</DynmaicLayout>
      </body>
    </html>
  );
}