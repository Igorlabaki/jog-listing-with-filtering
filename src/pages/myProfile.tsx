import { User } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { ChangePhotoModal } from "../Components/modals/changePhotoModal";
import { Button } from "../Components/util/Button";
import { LayoutComponent } from "../Components/util/layout";
import SelectItemsComponent from "../Components/util/selectItems";
import { recoverUserInformation } from "../database/users";
import useAuthContext from "../hook/useAuthContext";
import { FaUserEdit } from "react-icons/fa";
import { LoadingUserDataComponent } from "../Components/users/loadingUserData";

export default function MyProfile() {
  const { authUser, setAuthUser } = useAuthContext();

  const [changePhotoHover, setchangePhotoHover] = useState(false);
  const [isChangePhotoModalOpen, setIsChangePhotoModalOpen] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined | null>();
  const [bio, setBio] = useState<any>();
  const [levelType, setLevelType] = useState<string | undefined | null>(
    authUser?.level
  );
  const [areaType, setAreaType] = useState<string | undefined | null>(
    authUser?.area
  );
  const [username, setUsername] = useState<any>(authUser?.username);
  const [email, setEmail] = useState<any>(authUser?.email);
  const [editMode, setEditMode] = useState(false);
  const [selectSkill, setSelectSkill] = useState<any>();

  const [skillsList, setSkillsList] = useState<string[]>([]);

  const [loadingData, setLoadingData] = useState<boolean>(false);

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

    const list = authUser?.Skills.map((item: any) => {
      return item.skill.text;
    });
    setSkillsList(() => list);
  }, []);

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  async function updateAuth() {
    setLoadingData(true);
    const bodyReq = {
      id: authUser?.id,
      avatar: avatar,
      bio: bio,
      level: levelType,
      area: areaType,
      email: email,
      username: username,
    };
    const userUpdated = await axios
      .put("/api/auth", bodyReq)
      .then((resp) => resp.data);

    setAuthUser((prev: User) => ({
      ...userUpdated,
    }));
    setEditMode(false);
    setTimeout(() => setLoadingData(false), 2500);
  }

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white py-3 px-2 rounded-lg shadow-isadora relative w-full">
        <div className="flex justify-start w-full ">
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
                <p className="text-white font-semibold text-[9px] lg:text-[11px]">
                  Update photo
                </p>
              </div>
            </div>
          </div>
          <div className="px-5 py-5 mt-10 flex flex-col justify-start items-start w-full ">
            {loadingData ? (
              <LoadingUserDataComponent />
            ) : (
              <div className="w-full flex justify-center items-start flex-col animate-openMenu">
                {editMode ? (
                  <form
                    className="w-full relative flex flex-col gap-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateAuth();
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <SelectItemsComponent
                        title="Select your level"
                        type={levelType}
                        setType={setLevelType}
                        listOptions={[
                          "Intern",
                          "Junior",
                          "Middle",
                          "Senior",
                          "Specialist",
                        ]}
                        handleHidden={true}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          title="Save"
                          className="bg-desaturatedDarkCyan py-1 text-white font-semibold text-[13px] rounded-md w-[50px] h-auto shadow-md hover:shadow:none hover:brightness-125"
                        />
                        <Button
                          type="button"
                          title="Cancel"
                          onClick={() => setEditMode(false)}
                          className="bg-red-300 py-1 text-white font-semibold text-[13px] rounded-md w-[50px] h-auto shadow-md hover:shadow:none hover:brightness-125"
                        />
                      </div>
                    </div>
                    <SelectItemsComponent
                      title="Select your area"
                      type={areaType}
                      setType={setAreaType}
                      listOptions={["Frontend", "Backend", "FullStack"]}
                      handleHidden={true}
                    />
                    <input
                      placeholder="Type your username"
                      type="text"
                      className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
                      value={username}
                      onChange={(e) => {
                        e.preventDefault();
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      placeholder="Type your email"
                      type="email"
                      className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
                      value={email}
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                    />
                    <textarea
                      className="bg-LightGrayishCyan resize-none w-full h-24 text-sm py-2 px-2 outline-none rounded-lg 
                      "
                      placeholder={authUser?.bio ? "" : "Write about you..."}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-center w-full text-desaturatedDarkCyan">
                      <p className="font-semibold text-[16px] text-desaturatedDarkCyan">
                        {authUser?.area} {authUser?.level}
                      </p>
                      <FaUserEdit
                        onClick={() => setEditMode(true)}
                        className={`cursor-pointer`}
                      />
                    </div>
                    <p className="font-semibold text-2xl  text-veryDarkGraishCyan">
                      {authUser?.username}
                    </p>
                    <div className="flex space-x-3 text-[12px] text-darkGrayishYan font-semibold">
                      <p>{authUser?.email}</p>
                    </div>
                    {authUser?.bio && (
                      <div className="mt-3 flex flex-col  justify-center items-start w-full">
                        <p className="font-semibold text-[13px] text-desaturatedDarkCyan">
                          About me:
                        </p>
                        <p className="text-veryDarkGraishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-semibold px-5 py-1 spa">
                          {authUser.bio}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            <hr className="border-[1px] border-gray-300 w-full my-3" />
            <form
              className="flex justify-start items-center w-full gap-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!selectSkill) {
                  setSkillsList(() => [selectSkill]);
                } else {
                  if (
                    skillsList?.find((item: string) => item === selectSkill)
                  ) {
                    return;
                  }
                  setSkillsList((prevState: any) => [
                    ...prevState,
                    selectSkill,
                  ]);
                }
                setSelectSkill("");
              }}
            >
              <p className="text-desaturatedDarkCyan  font-semibold text-sm">
                Skills:
              </p>
              <input
                type="text"
                className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
                value={selectSkill}
                onChange={(e) => {
                  e.preventDefault();
                  setSelectSkill(e.target.value);
                }}
              />
            </form>
            <div className="mt-3 flex justify-start items-center flex-wrap gap-x-[5px] gap-y-2">
              {skillsList?.map((skill: string, i) => {
                return (
                  <div
                    key={i}
                    className={`bg-LightGrayishCyan shadow-md text-sm min-w-[90px]  font-semibold h-6 overflow-hidden text-desaturatedDarkCyan flex justify-between rounded-sm`}
                  >
                    <p className="px-1 text-[13px] font-bold">{skill}</p>
                    <div className="bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center">
                      <RiCloseFill
                        color="white"
                        size={16}
                        onClick={() => {
                          setSkillsList(() =>
                            skillsList.filter((item: any) => item != skill)
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              title="Save"
              className="bg-desaturatedDarkCyan text-white font-semibold text-[13px] rounded-md w-[50px] h-auto mt-2 py-1"
              onClick={() => updateAuth()}
            />
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
                    updateAuth();
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
