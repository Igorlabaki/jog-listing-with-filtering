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
  setEditMode: any;
}

export function UserAvatarComponent({
  handleOpenPhotoModal,
  setEditMode,
}: Props) {
  const { authUser, setAuthUser, avatar, setAvatar } = useAuthContext();
  const [changePhotoHover, setchangePhotoHover] = useState(false);
  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);

  async function updateAvatar() {
    const bodyReq = {
      id: authUser.id,
      avatar: avatar,
    };
    const userUpdated = await axios
      .put("/api/auth", bodyReq)
      .then((resp) => resp.data);

    setAuthUser((prev: User) => ({
      ...userUpdated,
    }));

    setEditMode(false);
  }

  function handleClosePhotoModal() {
    setIsChangePhotoModalOpen(false);
  }

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={`absolute md:relative`}>
      <div
        className="w-[90px] h-[90px] md:w-[100px] md:h-[100px]  bg-gray-200 rounded-full flex flex-col 
      justify-center py-3 items-center relative overflow-hidden bottom-11 left-2 lg:bottom-0 lg:left-0 shadow-lg"
        onMouseOver={() => setchangePhotoHover(true)}
        onMouseOut={() => setchangePhotoHover(false)}
      >
        {authUser?.avatar ? (
          <div className="h-[70px] w-[70px] md:h-16 md:w-16 cursor-pointer mt-[-26px]">
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
      {isChangePhotoModalOpen && (
        <ChangePhotoModal onClose={() => handleClosePhotoModal()}>
          <div
            className="bg-white  flex justify-start items-center flex-col relative h-auto
           w-[80%] py-10 rounded-lg overflow-hidden px-10"
          >
            <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
              <IoIosClose
                size={25}
                className={"text-desaturatedDarkCyan cursor-pointer"}
                onClick={() => handleClosePhotoModal()}
              />
            </div>
            {authUser?.avatar && !avatar ? (
              <div className="h-24 w-24 md:h-32 md:w-32 cursor-pointer">
                <img
                  src={authUser?.avatar}
                  className="h-full w-full"
                  alt="user avatar"
                />
              </div>
            ) : avatar ? (
              <img src={avatar} alt="avatar" className="h-32 w-32" />
            ) : (
              <FiUser size={100} className={`text-desaturatedDarkCyan`} />
            )}
            <div className="flex flex-col w-full justify-center items-start mt-5">
              <p className="text-sm font-semibold text-desaturatedDarkCyan">
                Choose your avatar:
              </p>
              <div className="flex flex-wrap gap-2 justify-center items-center mt-2">
                {list.map((item: number) => {
                  return (
                    <>
                      <div
                        className="w-[74px] h-20 bg-gray-100 flex justify-center items-center
                        rounded-md cursor-pointer hover:border-2 hover:border-desaturatedDarkCyan
                        "
                        onClick={() => {
                          setAvatar(`https://robohash.org/${item}`);
                        }}
                      >
                        <img
                          src={`https://robohash.org/${item}`}
                          alt="avatar"
                        />
                      </div>
                    </>
                  );
                })}
                <Button
                  title="Apply"
                  className="w-full rounded-md bg-desaturatedDarkCyan text-white font-semibold py-2"
                  onClick={() => {
                    updateAvatar();
                    handleClosePhotoModal();
                  }}
                />
              </div>
            </div>
          </div>
        </ChangePhotoModal>
      )}
    </div>
  );
}
