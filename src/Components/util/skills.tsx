import { Skill } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsCheck, BsCheckCircle } from "react-icons/bs";
import useAuthContext from "../../hook/useAuthContext";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";

interface SkillsProps {
  skills: string[];
}

export default function SkillsComponent({ skills }: SkillsProps) {
  const router = useRouter();

  const { search, setSearch } = useSearchContext();
  const { authUser } = useAuthContext();
  const { job } = useJobContext();
  const [userJobMatchSkill, setUserJobMatchSkill] = useState(false);

  function userJobMatch() {
    if (router.asPath.includes("job")) {
      setUserJobMatchSkill;
    }
  }

  const skillUser = authUser?.Skills.map((item: any) => {
    return item.skill.text;
  });

  return (
    <>
      {skills?.map((skill, i) => {
        const match = skillUser?.find(
          (item: any) =>
            item?.toLocaleLowerCase() === skill?.toLocaleLowerCase()
        );
        return (
          <div key={i}>
            <div
              className={`${match && "border-[1px] border-desaturatedDarkCyan"}
              relative min-w-[70px] font-light min-h-[20px] py-1 px-3 shadow-md rounded-md hover:bg-desaturatedDarkCyan 
              hover:text-white cursor-pointer text-md flex justify-center items-center gap-2
              ${
                search.find(
                  (item: string) =>
                    item.toLocaleLowerCase() === skill.toLocaleLowerCase()
                )
                  ? "bg-desaturatedDarkCyan  text-white"
                  : "bg-LightGrayishCyan"
              }`}
              onMouseOver={() => {
                setUserJobMatchSkill(true);
                console.log("i");
              }}
              onMouseOut={() => setUserJobMatchSkill(false)}
              onClick={() => {
                if (!search) {
                  setSearch(() => [skill]);
                } else if (
                  search.find(
                    (item: string) =>
                      item.toLocaleLowerCase() === skill.toLocaleLowerCase()
                  )
                ) {
                  setSearch((prevState: any) =>
                    prevState.filter(
                      (item: string) =>
                        item.toLocaleLowerCase() != skill.toLocaleLowerCase()
                    )
                  );
                } else {
                  setSearch((prevState: any) => [...prevState, skill]);
                }
              }}
            >
              {skill}
              <div
                className={`${match ? "flex" : "hidden"}
                 mb-1
                 `}
              >
                <BsCheckCircle size={13} className={""} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
