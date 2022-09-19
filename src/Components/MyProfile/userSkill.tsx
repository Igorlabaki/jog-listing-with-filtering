import { parseCookies } from "nookies";
import React, { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import useAuthContext from "../../hook/useAuthContext";

interface Props {
  setSkillsList: any;
  skillsList: string[];
  editMode: boolean;
  loadingSkillsListData: boolean;
}

export function UserSkillComponent({
  setSkillsList,
  skillsList,
  editMode,
  loadingSkillsListData,
}: Props) {
  const { authUser, recoverUserInformation } = useAuthContext();
  const [selectSkill, setSelectSkill] = useState<any>(authUser?.Skill);

  useEffect(() => {
    const { userToken } = parseCookies();
    if (userToken) {
      recoverUserInformation(userToken);
    }
  }, []);

  return (
    <>
      <form
        className="flex justify-start items-center w-full gap-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectSkill) {
            setSkillsList(() => [selectSkill]);
          } else {
            if (
              skillsList?.find(
                (item: string) =>
                  item?.toLowerCase() === selectSkill?.toLowerCase()
              )
            ) {
              return;
            }
            setSkillsList((prevState: any) => [...prevState, selectSkill]);
          }
          setSelectSkill("");
        }}
      >
        <p className="text-desaturatedDarkCyan  text-sm">Skills:</p>
        <input
          type="text"
          className="flx-1 bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm  text-desaturatedDarkCyan"
          value={selectSkill}
          onChange={(e) => {
            e.preventDefault();
            setSelectSkill(e.target.value);
          }}
        />
        <p
          onClick={() => setSkillsList(() => [])}
          className={`${editMode && "hidden"}
                cursor-pointer font-semibold text-[14px] text-desaturatedDarkCyan hover:underline`}
        >
          Clear
        </p>
      </form>
      <div
        className={`
            mt-3 flex justify-start items-center flex-wrap gap-x-[10px] gap-y-2`}
      >
        {loadingSkillsListData ? (
          <div className="mt-3 flex justify-start items-center flex-wrap gap-x-[10px] gap-y-2">
            <div
              className={`bg-gray-200 shadow-md text-sm min-w-[90px]  h-6 overflow-hidden
                 rounded-sm animate-pulse`}
            />
            <div
              className={`bg-gray-200 shadow-md text-sm min-w-[90px]  h-6 overflow-hidden
                 rounded-sm animate-pulse`}
            />
            <div
              className={`bg-gray-200 shadow-md text-sm min-w-[90px]  h-6 overflow-hidden
                 rounded-sm animate-pulse`}
            />
            <div
              className={`bg-gray-200 shadow-md text-sm min-w-[90px]  h-6 overflow-hidden
                 rounded-sm animate-pulse`}
            />
            <div
              className={`bg-gray-200 shadow-md text-sm min-w-[90px]  h-6 overflow-hidden
                 rounded-sm animate-pulse`}
            />
          </div>
        ) : (
          skillsList?.map((skill: string, i) => {
            return (
              <div
                key={i}
                className={`${
                  !authUser?.Skills?.map(
                    (item: any) => item.skill.text
                  ).includes(skill)
                    ? "bg-gray-200 text-gray-500"
                    : "bg-LightGrayishCyan text-desaturatedDarkCyan"
                }
                       shadow-md text-sm min-w-[90px]  h-6 overflow-hidden flex justify-between items-center rounded-sm`}
              >
                <p className="px-1 text-[13px] font">{skill}</p>
                <div
                  className={`${
                    !authUser.Skills.map(
                      (item: any) => item.skill.text
                    ).includes(skill)
                      ? "bg-gray-400 text-gray-500"
                      : "bg-desaturatedDarkCyan text-desaturatedDarkCyan"
                  }
                       bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center`}
                >
                  <RiCloseFill
                    color="white"
                    size={24}
                    onClick={() => {
                      setSkillsList(() =>
                        skillsList.filter((item: any) => item != skill)
                      );
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
