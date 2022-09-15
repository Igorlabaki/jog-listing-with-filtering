import React from "react";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";

interface SkillsProps {
  skills: string[];
}

export default function SkillsComponent({ skills }: SkillsProps) {
  const { search, setSearch } = useSearchContext();
  return (
    <>
      {skills?.map((skill, i) => {
        return (
          <div key={i}>
            <p
              className={`min-w-[70px] min-h-[20px] p-1 shadow-md rounded-sm hover:bg-desaturatedDarkCyan  hover:text-white cursor-pointer
              ${
                search.find(
                  (item: string) =>
                    item.toLocaleLowerCase() === skill.toLocaleLowerCase()
                )
                  ? "bg-desaturatedDarkCyan  text-white"
                  : "bg-LightGrayishCyan"
              }`}
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
            </p>
          </div>
        );
      })}
    </>
  );
}
