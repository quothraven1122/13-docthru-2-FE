import localFont from "next/font/local";
import "../globals.css";
import GnbWrapper from "./_components/GnbWrapper";
import Providers from "../providers";

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-variable",
  weight: "45 920",
});

export const metadata = {
  title: "docthru",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-pretendard">
        <Providers>
          <GnbWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
