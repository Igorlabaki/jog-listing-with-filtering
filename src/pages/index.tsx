import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { JobOportunity } from "../Components/jobOportunity";
import { listJobs } from "../database/data";
import { RiCloseFill } from "react-icons/ri";

const Home: NextPage = () => {
  const [search, setSearch] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

  const filterNoResults = listJobs.filter((item) => {
    const list = [];

    for (let index = 0; index < search.length; index++) {
      const filterCase = item.skills.map((item) => item.toLocaleUpperCase());
      if (filterCase.includes(search[index].toLocaleUpperCase())) {
        list.push(true);
      } else {
        list.push(false);
      }
    }
    return list.every((item) => item === true);
  });

  return (
    <div className="text-center  min-h-screen w-full flex flex-col bg-LightGrayishCyan">
      <div className="h-[100px] bg-desaturatedDarkCyan w-full">
        <img
          src={"/images/bg-header-desktop.svg"}
          className={`h-full w-full`}
          alt="bg-header image"
        />
      </div>
      <div className=" absolute left-0 right-0 mr-auto ml-auto w-[95%] md:[80%] top-[5rem] break-words  bg-white rounded-lg flex flex-col space-y-2 justify-start items-start  px-3 py-2">
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
              onChange={(e) => setSearchText(e.target.value)}
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
                className={`bg-LightGrayishCyan text-sm  font-semibold h-6 overflow-hidden text-desaturatedDarkCyan flex rounded-sm`}
              >
                <p className="px-1 text-[13px] font-bold">{skill}</p>
                <div className="bg-desaturatedDarkCyan hover:bg-veryDarkGraishCyan w-[20px] cursor-pointer flex justify-center items-center">
                  <RiCloseFill
                    color="white"
                    size={16}
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
      <div
        className={`flex flex-col flex-1 min-h-screen space-y-10 py-5 w-[95%] md:[80%] m-auto my-12 md:my-8 ${
          search.length > 0 ? "my-[6.5rem] md:my-[3rem]" : null
        } `}
      >
        {filterNoResults.map((job: any, i) => {
          return (
            <JobOportunity
              job={job}
              setSearch={setSearch}
              search={search}
              key={job.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
