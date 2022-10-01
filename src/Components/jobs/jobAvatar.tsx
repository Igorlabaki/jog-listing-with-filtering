import React from "react";
import { FaReact } from "react-icons/fa";

interface Props {
  avatar: string;
}

export function JobAvatarComponent({ avatar }: Props) {
  return (
    <div className={`absolute md:relative `}>
      <div
        className="h-20 w-20  bg-gray-200 rounded-full flex flex-col 
justify-center items-center relative overflow-hidden bottom-14 left-0 lg:bottom-0 lg:left-0 shadow-lg"
      >
        {avatar ? (
          <img src={avatar} className="h-full w-full" alt="user avatar" />
        ) : (
          <FaReact size={30} />
        )}
      </div>
    </div>
  );
}
