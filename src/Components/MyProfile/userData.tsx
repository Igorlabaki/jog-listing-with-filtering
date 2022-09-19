import { Link } from "@prisma/client";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import useAuthContext from "../../hook/useAuthContext";

interface Props {
  setEditMode: any;
}

export function UserDataComponet({ setEditMode }: Props) {
  const { authUser, recoverUserInformation } = useAuthContext();

  useEffect(() => {
    const { userToken } = parseCookies();
    if (userToken) {
      recoverUserInformation(userToken);
    }
  }, []);

  return (
    <div className="flex flex-col animate-openEditProfile w-full">
      <div className="flex justify-between items-center w-full  text-desaturatedDarkCyan ">
        <p className="text-[20px] text-desaturatedDarkCyan">
          {authUser?.area} {authUser?.level}
        </p>
        <FaUserEdit
          onClick={() => setEditMode(true)}
          className={`cursor-pointer`}
        />
      </div>
      <p className="flex justify-start font-semibold text-2xl  text-veryDarkGraishCyan">
        {authUser?.username}
      </p>
      <div className="flex space-x-3 text-[13px] text-darkGrayishYan font-light">
        <p>{authUser?.email}</p>
      </div>
      {authUser?.bio && (
        <div className="mt-3 flex flex-col  justify-center items-start w-full">
          <p className="text-[15px] text-desaturatedDarkCyan">Abouts me:</p>
          <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
            {authUser.bio}
          </p>
        </div>
      )}
      {authUser?.Country && (
        <div className="flex gap-x-2 mt-2">
          <p className="text-[15px] text-desaturatedDarkCyan">
            Currently Location:
          </p>
          <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
            <p>{authUser?.Country.name}</p>, <p>{authUser?.City.name}</p>
          </div>
        </div>
      )}
      {authUser?.Link?.length > 0 && (
        <div className="flex items-start gap-x-2 mt-2">
          <p className="text-[15px] text-desaturatedDarkCyan">Links:</p>
          <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-3 relative">
            {authUser.Link &&
              authUser.Link.map((link: Link) => {
                return (
                  <>
                    <div className="">
                      <div className="flex   text-blue-600">
                        <a href={link.name} target="_blank" rel="noreferrer">
                          {link.name.includes("github") ? (
                            <GoMarkGithub size={20} className={"text-black"} />
                          ) : link.name.includes("linkedin") ? (
                            <BsLinkedin size={20} />
                          ) : link.name.includes("instagram") ? (
                            <BsInstagram
                              size={20}
                              className={"text-pink-700"}
                            />
                          ) : link.name.includes("facebook") ? (
                            <AiFillFacebook size={24} />
                          ) : (
                            <BiWorld size={25} />
                          )}
                        </a>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
