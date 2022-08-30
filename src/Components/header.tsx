import React from "react";

export function HeaderComponent() {
  return (
    <div className="h-[100px] bg-desaturatedDarkCyan w-full">
      <img
        src={"/images/bg-header-desktop.svg"}
        className={`h-full w-full`}
        alt="bg-header image"
      />
    </div>
  );
}
