import dynamic from "next/dynamic";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import useAuthContext from "../../hook/useAuthContext";
import { FormComponent } from "../form";
import { propsAuthModal } from "../modals/authModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FiHome, FiUser } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import Image from "next/image";
import { ModalMenuComponent } from "../modals/modalMenu";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { BsChevronCompactLeft } from "react-icons/bs";
import { FaReact } from "react-icons/fa";

export function HeaderComponent() {
  const {
    authUser,
    handleCloseAuthModal,
    handleOpenAuthModal,
    isAuthModalOpen,
  } = useAuthContext();

  const ModalAuthComponent = dynamic<propsAuthModal>(() => {
    return import("../modals/authModal").then(
      (comp) => comp.ModalAuthComponent
    );
  });

  const [isModalMenuOpen, setIsModalMenuOpen] = useState(false);

  function handleOpenMenuModal() {
    setIsModalMenuOpen(() => true);
  }

  function handleCloseMenuModal() {
    setIsModalMenuOpen(() => false);
  }

  const router = useRouter();

  return (
    <div
      className={` ${
        router.asPath === "/" ? "h-[130px]" : "h-[100px] md:h-[95px]"
      } bg-desaturatedDarkCyan w-full static  flex flex-col justify-end  items-between`}
    >
      <div className="flex w-[90%] lg:w-[80%] m-auto justify-between items-end">
        <div
          className={`
          w-[250px] h-[60px] relative ml-[-1rem] cursor-pointer`}
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/logo/webLogo.png"}
            alt="logo brand"
            layout="fill"
            objectFit="fill"
            className="h-full w-full"
          />
        </div>
        {authUser ? (
          <div
            className=" flex justify-center items-center relative"
            onClick={() => handleOpenMenuModal()}
          >
            {authUser?.avatar ? (
              <div
                className={`rounded-full overflow-hidden h-[60px] w-[60px] md:h-16 md:w-16
                ${router.asPath === "/" && " md:bottom-2 "}
               cursor-pointer relative `}
              >
                <img
                  src={authUser?.avatar}
                  className={`h-full w-full relative z-10 rounded-full ${
                    router.asPath.includes("myProfile") ||
                    router.asPath.includes("company")
                      ? ""
                      : null
                  }`}
                  alt="user avatar"
                />
              </div>
            ) : (
              <GiHamburgerMenu
                size={30}
                className={`text-white cursor-pointer`}
              />
            )}
            {isModalMenuOpen && (
              <ModalMenuComponent onClose={() => handleCloseMenuModal()}>
                <div
                  className="
                  bg-white
                  flex justify-center items-start flex-col relative
                  h-full w-[200px]
                  rounded-b-md rounded-tl-md
                  text-sm  text-desaturatedDarkCyan
                  "
                >
                  <p className=" py-2 px-3">
                    Hello, {authUser?.username || authUser.name} !
                  </p>
                  <hr className="text-darkGrayishYan w-full" />
                  <ul className="w-full">
                    <li
                      className="cursor-pointer flex justify-start items-start gap-3
                     hover:bg-LightGrayishCyan w-full h-full 
                     py-2 px-3"
                    >
                      <RiHome2Line size={20} />
                      <p
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        Home
                      </p>
                    </li>
                    <li
                      className="cursor-pointer flex justify-start items-start gap-3
                     hover:bg-LightGrayishCyan w-full h-full 
                     py-2 px-3"
                    >
                      {authUser?.userType?.includes("developer") ? (
                        <>
                          <FiUser size={20} />
                          <p
                            onClick={() => {
                              router.push("/myProfile");
                            }}
                          >
                            My profile
                          </p>
                        </>
                      ) : (
                        <>
                          <FaReact size={20} />
                          <p
                            onClick={() => {
                              router.push("/companyProfile");
                            }}
                          >
                            Profile
                          </p>
                        </>
                      )}
                    </li>
                    <li
                      className="cursor-pointer flex justify-start items-start gap-3
                     hover:bg-LightGrayishCyan w-full h-full 
                     py-2 px-3"
                    >
                      <BiLogOut size={20} />
                      <p
                        onClick={() => {
                          destroyCookie(null, "userToken");
                          destroyCookie(null, "companyToken");
                          window.location.reload();
                        }}
                      >
                        Sign out
                      </p>
                    </li>
                  </ul>
                </div>
              </ModalMenuComponent>
            )}
          </div>
        ) : (
          <div className="cursor-pointer">
            <p
              className="text-white text-md font-light z-30"
              onClick={() => handleOpenAuthModal()}
            >
              Sing In
            </p>
          </div>
        )}
      </div>
      {isAuthModalOpen && (
        <ModalAuthComponent onClose={() => handleCloseAuthModal()}>
          <div
            className="bg-white  flex justify-center items-center flex-col relative 
           w-full h-full md:h-auto py-10 rounded-lg overflow-hidden"
          >
            <div className="absolute top-2 right-2 hover:bg-LightGrayishCyan rounded-full">
              <IoIosClose
                size={25}
                className={"text-desaturatedDarkCyan cursor-pointer"}
                onClick={() => handleCloseAuthModal()}
              />
            </div>
            <FormComponent />
          </div>
        </ModalAuthComponent>
      )}
    </div>
  );
}
