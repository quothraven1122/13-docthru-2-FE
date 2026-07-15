import ModalProvider from "@/providers/ModalProvider";
import React from "react";

export default function Providers({ children }) {
  return <ModalProvider>{children}</ModalProvider>;
}
