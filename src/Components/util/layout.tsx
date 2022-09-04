import React, { ReactNode } from "react";
import { HeaderComponent } from "../header";

interface Props {
  children: ReactNode;
}

export function LayoutComponent({ children }: Props) {
  return (
    <div className="text-center  min-h-screen w-full flex flex-col bg-LightGrayishCyan relative">
      <HeaderComponent />
      <div className=" w-[95%] md:w-[90%] mx-auto">{children}</div>
    </div>
  );
}
