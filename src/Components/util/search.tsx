import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";

export function SearchComponent() {
  const { search, setSearch } = useSearchContext();
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="mr-auto mt-[-1.5rem] ml-auto top-[4.55rem] break-words  bg-white rounded-lg flex flex-col space-y-2 justify-start items-start  px-3 py-2">
      <div className="flex space-x-2 w-[100%] mr-5 break-before-right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!search) {
              setSearch(() => [searchText]);
            } else {
              if (search.find((item: string) => item === searchText)) {
                return;
              }
              setSearch((prevState: any) => [...prevState, searchText]);
            }
            setSearchText("");
          }}
          className={`flex-1 flex justify-center items-center space-x-2`}
        >
          <input
            type="text"
            className="bg-LightGrayishCyan outline-none rounded-md w-[100%] px-2 h-6 text-sm font-semibold text-desaturatedDarkCyan"
            value={searchText}
            onChange={(e) => {
              e.preventDefault();
              setSearchText(e.target.value);
            }}
          />

          <p
            onClick={() => setSearch(() => [])}
            className="cursor-pointer font-bold text-[12px] text-desaturatedDarkCyan hover:underline"
          >
            Clear
          </p>
        </form>
      </div>
      <div className="bg-white flex flex-wrap gap-y-2 gap-x-3 justify-start items-start">
        {search?.map((skill: any, i: number) => {
          return (
            <div
              key={i}
              className={`bg-LightGrayishCyan shadow-md text-sm   h-6 overflow-hidden text-desaturatedDarkCyan
               flex justify-between items-center rounded-sm w-[100px]`}
            >
              <p className="px-1 text-[14px] ">{skill}</p>
              <div className="bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center">
                <RiCloseFill
                  color="white"
                  size={25}
                  onClick={() => {
                    setSearch(() =>
                      search.filter((item: any) => item != skill)
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
