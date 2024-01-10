"use client";
import "./globals.css";
import { UIProviders } from "./providers/UIProvider";
import { PlenaWalletProvider } from "plena-wallet-sdk";

const config = {
  dappToken:
    "91651531fc0ff6f89808b72c7ca0fcda6a9816a225e33f4b226e5bfdadccf776007dee0a61aa8bfd8f32ceed5c3374da4b820f51b1dd1829c441aaa4eee83891",
  dappId: "cm61ds5dotv8m80olbig",
  bridgeUrl: "connect.plena.finance",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlenaWalletProvider config={config}>
          <UIProviders>{children}</UIProviders>
        </PlenaWalletProvider>
      </body>
    </html>
  );
}