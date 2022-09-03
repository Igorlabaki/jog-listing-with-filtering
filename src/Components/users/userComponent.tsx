import Image from "next/image";
import { useRouter } from "next/router";
import useSearchContext from "../../hook/useSearchSContext";
import { User } from "../../Interfaces";
import SkillsComponent from "../util/skills";

interface UserProps {
  user: User;
}

export function UserComponent({ user }: UserProps) {
  const { setSearch } = useSearchContext();
  const router = useRouter();
  return (
    <div
      className={`bg-white w-full rounded-[3px] p-[17px] flex flex-col md:flex-row justify-between 
    hover:scale-[1.01] hover:shadow-md
  `}
    >
      <div
        className="flex relative"
        onClick={() => {
          router.push(`/user/${user.id}`);
          setSearch(() => []);
        }}
      >
        <div className="h-12 w-12 cursor-pointer  md:h-16 md:w-16 mr-5 absolute bottom-[4.55rem] md:relative md:bottom-0">
          <img src={user?.avatar} alt="brand" className="h-full w-full" />
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4">
            <>
              <p className="text cursor-pointer  font-bold text-[12px] md:text-[14px] text-desaturatedDarkCyan">
                {user?.name}
              </p>
            </>
          </div>
          <p className="font-bold text-[15px] text-start cursor-pointer ">
            {user?.levels[0]} {user?.areas[0]}
          </p>
          <div className="flex space-x-3 text-[12px] text-darkGrayishYan font-semibolds">
            {user?.periods[0]}
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
        <SkillsComponent skills={user.skills} />
      </div>
    </div>
  );
}
