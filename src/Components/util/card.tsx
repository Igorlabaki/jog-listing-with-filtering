import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function CardComponent({ children }: Props) {
  return (
    <div
      className={`bg-white w-full rounded-lg p-[17px] flex flex-col lg:flex-row justify-between 
hover:scale-[1.01] hover:shadow-md relative shadow-isadora md:shadow-lg cursor-pointer
`}
    >
      {children}
    </div>
  );
}
