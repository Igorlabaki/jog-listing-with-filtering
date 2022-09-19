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
  const { authUser, setAvatar, avatar } = useAuthContext();

  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);

  const [bio, setBio] = useState<any>();

  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [linksList, setLinksList] = useState<any[]>([]);

  const [loadingData, setloadingData] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [loadingSkillsListData, setLoadingSkillsListData] = useState(false);
  useState<boolean>(false);

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

  async function handleUpdateSkills(skilsListprops: any) {
    setLoadingSkillsListData(true);
    const bodyReq = {
      id: authUser.id,
      skillsList: skilsListprops,
    };
    const userUpdated = await axios
      .put("/api/auth", bodyReq)
      .then((resp) => resp.data);

    setEditMode(false);
    setTimeout(() => setLoadingSkillsListData(false), 2000);
  }

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white py-3 px-2 rounded-lg shadow-isadora relative w-full mb-10">
        <div className="flex justify-start w-full ">
          <UserAvatarComponent
            handleOpenPhotoModal={handleOpenPhotoModal}
            setEditMode={setEditMode}
          />
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
