import localFont from "next/font/local";
import "../globals.css";
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

export default function AuthLayout({ children }) {
  return (
    <html lang="en" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
