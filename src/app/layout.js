import localFont from "next/font/local";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
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
      <body className="min-h-full flex flex-col">
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
