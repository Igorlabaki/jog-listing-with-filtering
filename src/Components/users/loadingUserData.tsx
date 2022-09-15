import React from "react";

export function LoadingUserDataComponent() {
  return (
    <div className="w-full gap-y-2 flex flex-col">
      <div className="flex justify-between">
        <div className="bg-gray-200 animate-pulse w-[100px] h-4 rounded-lg" />
        <div className="bg-gray-200 animate-pulse w-4 h-4 rounded-lg" />
      </div>
      <div className="bg-gray-200 animate-pulse w-[150px] h-6 rounded-lg" />
      <div className="bg-gray-200 animate-pulse w-[150px] h-2 rounded-lg" />
      <div className="bg-gray-200 animate-pulse w-[70px] h-4 rounded-lg mt-2" />
      <div className="flex flex-col w-full mx-auto gap-y-2">
        <div className="flex flex-col justify-center gap-y-1 w-full">
          <div className="bg-gray-200 animate-pulse w-full h-2 rounded-lg" />
          <div className="bg-gray-200 animate-pulse w-full h-2 rounded-lg" />
          <div className="bg-gray-200 animate-pulse  w-full h-2 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
