import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import useAuthContext from "../../hook/useAuthContext";
import { CardComponent } from "../util/card";
import SkillsComponent from "../util/skills";

interface UserProps {
  user: any;
  token?: any;
}

export function UserComponent({ user }: UserProps) {
  const { handleOpenAuthModal, session } = useAuthContext();
  const router = useRouter();

  function handleRedirectAuthFilter() {
    if (session?.sessionToken) {
      router.push(`/user/${user?.id}`);
    } else if (!session?.sessionToken) {
      handleOpenAuthModal();
    }
  }

  return (
    <CardComponent>
      <div
        className="flex relative "
        onClick={() => {
          handleRedirectAuthFilter();
        }}
      >
        <div
          className="h-[70px] w-[70px] md:w-[80px] md:h-[80px] cursor-pointer bg-gray-200 rounded-full flex justify-center items-center overflow-hidden 
         mr-5 absolute bottom-[5.0rem] md:relative md:bottom-0 mb-1"
        >
          {user.avatar ? (
            <img
              src={user?.avatar}
              alt="brand"
              className="h-full w-full"
              color={"#000"}
              onClick={() => {
                handleRedirectAuthFilter();
              }}
            />
          ) : (
            <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
          )}
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4 ">
            <>
              <p className="text cursor-pointer   text-[16px] md:text-[20px] text-desaturatedDarkCyan">
                {user?.username}
              </p>
            </>
          </div>
          <p className="font-bold text-[20px] text-start cursor-pointer ">
            {user?.level} {user?.area}
          </p>
          <div className="flex space-x-1 text-[12px] text-darkGrayishYan font-semibolds">
            <p>{user?.email}</p>
            <p>- </p>
            <p> {user?.Country?.name}</p>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
        <SkillsComponent
          noCheck={true}
          skills={user?.Skills?.map((item: any) => {
            return item.skill.text;
          })}
          borderSkills={true}
        />
      </div>
    </CardComponent>
  );
}
