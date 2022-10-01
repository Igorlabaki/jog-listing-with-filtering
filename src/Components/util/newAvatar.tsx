import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import useAuthContext from "../../hook/useAuthContext";
import { ChangePhotoModal } from "../modals/changePhotoModal";
import { Button } from "./Button";
interface Props {
  handleClosePhotoModal: any;
}
export function NewAvatarComponent({ handleClosePhotoModal }: Props) {
  const { authUser, uploadPhoto } = useAuthContext();
  const [photoFile, setPhotoFile] = useState<any>();
  const [avatar, setAvatar] = useState<string>();
  return (
    <>
      <ChangePhotoModal onClose={handleClosePhotoModal}>
        <div
          className="bg-white  flex justify-start items-center flex-col relative h-auto space-y-10
            py-10 rounded-lg overflow-hidden px-10
           "
        >
          <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
            <IoIosClose
              size={25}
              className={"text-desaturatedDarkCyan cursor-pointer"}
              onClick={() => handleClosePhotoModal()}
            />
          </div>
          {authUser?.avatar ? (
            <img
              src={authUser?.avatar}
              alt=""
              className="h-44 w-44 rounded-full"
            />
          ) : avatar ? (
            <img src={avatar} alt="" className="h-44 w-44 rounded-full" />
          ) : null}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setPhotoFile(e.target.files[0]);
              }
            }}
          />
          <Button
            title="Upload Photo"
            className="bg-desaturatedDarkCyan text-white font-light py-2 px-4 rounded-md mt-5"
            onClick={() => uploadPhoto(photoFile)}
          />
        </div>
      </ChangePhotoModal>
    </>
  );
}
