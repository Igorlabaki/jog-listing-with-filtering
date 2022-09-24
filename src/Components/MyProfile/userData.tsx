import { Link, User } from "@prisma/client";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import useAuthContext from "../../hook/useAuthContext";
import useMatchContext from "../../hook/useMatchContext";

interface Props {
  setEditMode?: any;
  user: any;
  editModeShow?: boolean;
}

export function UserDataComponet({ setEditMode, user, editModeShow }: Props) {
  const { authUser, recoverUserInformation } = useAuthContext();
  const { matchUserJob, percentageMatch } = useMatchContext();
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
          {user?.area} {user?.level}
        </p>
        {editModeShow && (
          <FaUserEdit
            onClick={() => setEditMode(true)}
            className={`cursor-pointer`}
          />
        )}
      </div>
      <p className="flex justify-start font-semibold text-2xl  text-veryDarkGraishCyan">
        {user?.username}
      </p>
      <div className="flex space-x-3 text-[13px] text-darkGrayishYan font-light">
        <p>{user?.email}</p>
      </div>
      {user?.bio && (
        <div className="flex flex-col  justify-center items-start w-full">
          <p className="text-[15px] text-desaturatedDarkCyan">Abouts me:</p>
          <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
            {user.bio}
          </p>
        </div>
      )}
      {user?.Country && (
        <div className="flex gap-x-2 mt-1">
          <p className="text-[15px] text-desaturatedDarkCyan">
            Currently Location:
          </p>
          <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
            <p>{user?.Country.name}</p>, <p>{user?.City.name}</p>
          </div>
        </div>
      )}
      {user?.Link?.length > 0 && (
        <div className="flex items-start gap-x-2 mt-2">
          <p className="text-[15px] text-desaturatedDarkCyan">Links:</p>
          <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-3 relative">
            {user.Link &&
              user.Link.map((link: Link) => {
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
