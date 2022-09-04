import { Console } from "console";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";
import { Job } from "../../Interfaces";
import SkillsComponent from "../util/skills";

interface Props {
  job: Job;
}

export function JobOportunity({ job }: Props) {
  const router = useRouter();
  const { setSearch } = useSearchContext();
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
      className={`bg-white w-full rounded-[3px] p-[17px] flex flex-col lg:flex-row justify-between 
      hover:scale-[1.01] hover:shadow-md
        ${job?.featured ? "border-l-4 border-desaturatedDarkCyan" : null}
    `}
    >
      <div
        className="flex relative"
        onClick={() => {
          router.push(`/job/${job?.id}`);
          setSearch(() => []);
        }}
      >
        <div className="h-12 w-12 cursor-pointer  md:h-16 md:w-16 mr-5 absolute bottom-[4.55rem] md:relative md:bottom-0">
          <Image
            src={job?.image}
            alt="brand"
            className="h-full w-full"
            layout="fill"
          />
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4">
            <>
              <p
                className="text cursor-pointer  font-bold text-[12px] md:text-[14px] text-desaturatedDarkCyan"
                onClick={() => router.push(`/job/${job?.id}`)}
              >
                {job?.company}
              </p>
              <div className="flex space-x-2">
                {handleNew()}
                {handleFeatured()}
              </div>
            </>
          </div>
          <p
            className="font-bold text-[15px] text-start cursor-pointer "
            onClick={() => router.push(`/job/${job?.id}`)}
          >
            {job?.job_title}
          </p>
          <div className="flex space-x-3 text-[12px] text-darkGrayishYan font-semibolds">
            <p>{job?.create_at}</p>
            <p>{job?.period}</p>
            <p>{job?.region}</p>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div className="flex text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
        <SkillsComponent skills={job.skills} />
      </div>
    </div>
  );
}
