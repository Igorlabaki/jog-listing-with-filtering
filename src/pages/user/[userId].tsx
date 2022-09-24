import { Skill } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { UserDataComponet } from "../../Components/MyProfile/userData";
import { LayoutComponent } from "../../Components/util/layout";
import SkillsComponent from "../../Components/util/skills";
import useUserContext from "../../hook/useUserContext";

export default function UserIdPage() {
  const {
    query: { userId },
  } = useRouter();

  const { user, selectUserById } = useUserContext();

  useEffect(() => {
    selectUserById(userId);
  }, []);

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white rounded-lg shadow-isadora relative w-full mb-10 flex space-x-3 space-y-10 py-5 px-5 ">
        <div className={`absolute md:relative`}>
          <div
            className="w-[90px] h-[90px] md:w-[100px] md:h-[100px]  bg-gray-200 rounded-full flex flex-col 
            justify-center py-3 items-center relative overflow-hidden bottom-11 left-2 lg:bottom-0 lg:left-0 shadow-lg"
          >
            {user?.avatar ? (
              <div className="h-[70px] w-[70px] md:h-16 md:w-16 cursor-pointer mt-[-26px]">
                <img
                  src={user.avatar}
                  className="h-full w-full"
                  alt="user avatar"
                />
              </div>
            ) : (
              <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[40px]" />
            )}
          </div>
        </div>
        <div className="flex flex-col py-5 md:py-0 flex-wrap w-full">
          <UserDataComponet user={user} />
          <hr className="border-[1px] border-gray-300 w-full my-3 " />
          <p className="text-desaturatedDarkCyan flex justify-start w-full">
            Skills:
          </p>
          <div className="flex  gap-x-2 gap-y-2 text-desaturatedDarkCyan mt-3 flex-wrap text-sm w-full">
            <SkillsComponent
              noCheck={true}
              borderSkills={true}
              skills={user?.Skills?.map((item: any) => {
                return item.skill.text;
              })}
            />
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
