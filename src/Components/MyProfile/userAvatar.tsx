import { User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import useAuthContext from "../../hook/useAuthContext";
import { ChangePhotoModal } from "../modals/changePhotoModal";
import { Button } from "../util/Button";

interface Props {
  handleOpenPhotoModal: any;
}

export function UserAvatarComponent({ handleOpenPhotoModal }: Props) {
  const { authUser, setAuthUser, avatar, setAvatar } = useAuthContext();
  const [changePhotoHover, setchangePhotoHover] = useState(false);
  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);

  return (
    <div className={`absolute md:relative`}>
      <div
        className="w-[90px] h-[90px] md:w-[100px] md:h-[100px]  bg-gray-200 rounded-full flex flex-col 
      justify-center py-3 items-center relative overflow-hidden bottom-14 left-2 lg:bottom-0 lg:left-0 shadow-lg"
        onMouseOver={() => setchangePhotoHover(true)}
        onMouseOut={() => setchangePhotoHover(false)}
      >
        {authUser?.avatar ? (
          <div className="h-[80px] w-[80px] md:h-16 md:w-16 cursor-pointer mt-[-26px]">
            <img
              src={authUser.avatar}
              className="h-full w-full"
              alt="user avatar"
            />
          </div>
        ) : (
          <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[60px]" />
        )}
        <div
          className={`${changePhotoHover ? "flex" : "hidden"}
          bg-desaturatedDarkCyan w-full absolute h-7 bottom-0
                cursor-pointer justify-center items-start animate-openMenu`}
          onClick={() => handleOpenPhotoModal()}
        >
          <p className="text-white font-light text-[11px] lg:text-[11px]">
            Update photo
          </p>
        </div>
      </div>
    </div>
  );
}
