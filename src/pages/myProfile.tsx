import { Link, User } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { GoMarkGithub } from "react-icons/go";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { ChangePhotoModal } from "../Components/modals/changePhotoModal";
import { Button } from "../Components/util/Button";
import { LayoutComponent } from "../Components/util/layout";
import SelectItemsComponent from "../Components/util/selectItems";
import { recoverUserInformation } from "../database/users";
import useAuthContext from "../hook/useAuthContext";
import { FaUserEdit } from "react-icons/fa";
import { LoadingUserDataComponent } from "../Components/users/loadingUserData";
import { CountryListComponent } from "../Components/util/countryList";
import { link } from "fs";
import { BiWorld } from "react-icons/bi";
import { AiFillFacebook } from "react-icons/ai";
import EditModeComponent from "../Components/MyProfile/editMode";
import { UserDataComponet } from "../Components/MyProfile/userData";
import { UserAvatarComponent } from "../Components/MyProfile/userAvatar";
import { UserSkillComponent } from "../Components/MyProfile/userSkill";

export default function MyProfile() {
  const { authUser, setAuthUser, setAvatar, avatar } = useAuthContext();

  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);

  const [bio, setBio] = useState<any>();

  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [linksList, setLinksList] = useState<any[]>([]);

  const [loadingData, setloadingData] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [loadingSkillsListData, setLoadingSkillsListData] = useState(false);
  useState<boolean>(false);

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function handleOpenPhotoModal() {
    setIsChangePhotoModalOpen(true);
  }

  function handleClosePhotoModal() {
    setIsChangePhotoModalOpen(false);
  }

  useEffect(() => {
    const { userToken } = parseCookies();
    if (userToken) {
      recoverUserInformation(userToken);
    }
    setAvatar(() => authUser?.avatar);
    setBio(() => authUser?.bio);

    const list = authUser?.Skills?.map((item: any) => {
      return item.skill.text;
    });
    setSkillsList(() => list);
    setLinksList((item) => ({
      ...authUser,
    }));
  }, []);

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

  async function handleUpdateSkills(skilsListprops: any) {
    setLoadingSkillsListData(true);
    const bodyReq = {
      id: authUser.id,
      skillsList: skilsListprops,
    };
    const userUpdated = await axios
      .put("/api/auth", bodyReq)
      .then((resp) => resp.data);

    const { userToken } = parseCookies();
    if (userToken) {
      recoverUserInformation(userToken);
    }

    setEditMode(false);
    setTimeout(() => setLoadingSkillsListData(false), 2000);
  }

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white py-3 px-2 rounded-lg shadow-isadora relative w-full mb-10">
        <div className="flex justify-start w-full ">
          <UserAvatarComponent handleOpenPhotoModal={handleOpenPhotoModal} />
          <div
            className={`${editMode ? "mt-2" : "mt-10"}
            px-5 py-5  flex flex-col justify-start items-start w-full `}
          >
            {loadingData ? (
              <LoadingUserDataComponent />
            ) : (
              <div className="w-full flex justify-center items-start flex-col animate-openMenu">
                {editMode ? (
                  <EditModeComponent
                    setEditMode={setEditMode}
                    setLoadingData={setloadingData}
                  />
                ) : (
                  <UserDataComponet setEditMode={setEditMode} />
                )}
              </div>
            )}
            <hr className="border-[1px] border-gray-300 w-full my-3" />
            <UserSkillComponent
              editMode={editMode}
              loadingSkillsListData={loadingSkillsListData}
              setSkillsList={setSkillsList}
              skillsList={skillsList}
            />
            {skillsList?.length > 0 && !editMode && (
              <div className="flex space-x-3 mt-5">
                <Button
                  type="button"
                  title="Save"
                  className="bg-desaturatedDarkCyan py-1 text-white font- text-[13px] rounded-md w-[60px] h-auto shadow-md hover:shadow:none hover:brightness-[.90]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateSkills(skillsList);
                  }}
                />
              </div>
            )}
          </div>
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
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["userToken"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
