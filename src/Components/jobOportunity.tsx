import { Console } from "console";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Job } from "../Interfaces";

interface Props {
  job: Job;
  search: any;
  setSearch: any;
}

export function JobOportunity({ job, setSearch, search }: Props) {
  function handleNew() {
    if (job.new) {
      return (
        <div className="bg-desaturatedDarkCyan flex justify-center items-center px-2 text-white text-[10px] font-bold rounded-full">
          <p>NEW!</p>
        </div>
      );
    }
  }

  function handleFeatured() {
    if (job.featured) {
      return (
        <div className="bg-veryDarkGraishCyan flex justify-center items-center px-2 text-white text-[10px] font-bold rounded-full">
          <p>FEATURED</p>
        </div>
      );
    }
  }

  return (
    <div
      className={`bg-white w-full rounded-[3px] p-[17px] flex flex-col md:flex-row justify-between
        ${job.featured ? "border-l-4 border-desaturatedDarkCyan" : null}
    `}
    >
      <div className="flex relative">
        <div className="h-12 w-12 md:h-16 md:w-16 mr-5 absolute bottom-[4.55rem] md:relative md:bottom-0">
          <img src={job.image} alt="brand" className="h-full w-full" />
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4">
            <>
              <p className="text font-bold text-[12px] md:text-[14px] text-desaturatedDarkCyan">
                {job.company}
              </p>
              <div className="flex space-x-2">
                {handleNew()}
                {handleFeatured()}
              </div>
            </>
          </div>
          <p className="font-bold text-[15px] text-start">{job.job_title}</p>
          <div className="flex space-x-3 text-[12px] text-darkGrayishYan font-semibolds">
            <p>{job.create_at}</p>
            <p>{job.period}</p>
            <p>{job.region}</p>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] space-x-2 text-desaturatedDarkCyan font-bold break-words">
        {job.skills.map((skill, i) => {
          return (
            <div key={i}>
              <p
                className={`bg-LightGrayishCyan p-1 rounded-sm hover:bg-desaturatedDarkCyan hover:text-white cursor-pointer`}
                onClick={() => {
                  if (!search) {
                    setSearch(() => [skill]);
                  } else {
                    if (search.find((item: string[]) => item === skill)) {
                      return;
                    }
                    setSearch((prevState: any) => [...prevState, skill]);
                  }
                }}
              >
                {skill}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
