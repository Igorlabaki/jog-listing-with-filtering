import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";
import useAuthContext from "../../hook/useAuthContext";
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
    <div
      className={`bg-white w-full rounded-[3px] p-[17px] flex flex-col lg:flex-row justify-between 
    hover:scale-[1.01] hover:shadow-md
  `}
    >
      <div
        className="flex relative "
        onClick={() => {
          handleRedirectAuthFilter();
        }}
      >
        <div
          className="h-16 w-16 cursor-pointer bg-gray-300 rounded-full flex justify-center items-center overflow-hidden 
         md:h-16 md:w-16 mr-5 absolute bottom-[5.0rem] md:relative md:bottom-0"
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
            <FiUser className="text-veryDarkGraishCyan text-[30px] md:text-[60px]" />
          )}
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4 ">
            <>
              <p className="text cursor-pointer  font-semibold text-[16px] md:text-[20px] text-desaturatedDarkCyan">
                {user?.username}
              </p>
            </>
          </div>
          <p className="font-bold text-[20px] text-start cursor-pointer ">
            {user?.level} {user?.area}
          </p>
          <div className="flex space-x-3 text-[12px] text-darkGrayishYan font-semibolds">
            {user?.email} -
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
        <SkillsComponent
          skills={user?.Skills?.map((item: any) => {
            return item.skill.text;
          })}
          borderSkills={true}
        />
      </div>
    </div>
  );
}
