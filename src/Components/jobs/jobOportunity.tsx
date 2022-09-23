import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import useSearchContext from "../../hook/useSearchSContext";
import { Job } from "../../Interfaces";
import SkillsComponent from "../util/skills";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  job: Job;
  token?: any;
  percentageMatch: any;
}

export function JobOportunity({ job, percentageMatch }: Props) {
  const router = useRouter();
  const { setSearch } = useSearchContext();
  const { handleOpenAuthModal, session } = useAuthContext();

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

  function handleRedirectAuthFilter() {
    if (session?.sessionToken) {
      router.push(`/job/${job.id}`);
    } else {
      handleOpenAuthModal();
    }
  }

  return (
    <div
      className={`bg-white w-full rounded-[3px] p-[17px] flex flex-col lg:flex-row justify-between 
      hover:scale-[1.01] hover:shadow-md
        ${job?.featured ? "border-l-4 border-desaturatedDarkCyan" : null}
    `}
    >
      <div className="flex relative" onClick={() => {}}>
        <div className="h-16 w-16 cursor-pointer  md:h-16 md:w-16 mr-5 absolute bottom-[5.5rem] md:relative md:bottom-0">
          <Image
            src={job?.image}
            alt="brand"
            className="h-full w-full"
            layout="fill"
            onClick={() => {
              handleRedirectAuthFilter();
            }}
          />
        </div>

        <div
          className={`space-y-1 pt-4 md:pt-0 flex flex-col justify-start items-start`}
        >
          <div className="flex justify-start items-center  space-x-4 mt-2">
            <>
              <p
                className="text cursor-pointer  font text-[16px] md:text-[20px] text-desaturatedDarkCyan"
                onClick={() => {
                  handleRedirectAuthFilter();
                }}
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
            className="font-semibold text-[20px] text-start cursor-pointer "
            onClick={() => {
              handleRedirectAuthFilter();
            }}
          >
            {job?.job_title}
          </p>
          <div className="flex justify-between items-center w-ful">
            <div className="flex space-x-3 text-[13px] text-darkGrayishYan font-light">
              <p>{job?.create_at}</p>
              <p>{job?.period}</p>
              <p>{job?.region}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="h2 my-2" />
      <div
        className="flex items-end text-[14px]  space-x-1
       text-desaturatedDarkCyan relative  flex-wrap gap-y-2"
      >
        <div
          className={`
         absolute top-[-100px] right-0 lg:right-5 lg:top-0 h-10 w-10 rounded-full text-sm flex justify-center items-center text-desaturatedDarkCyan `}
        >
          {percentageMatch ? (
            <CircularProgressbar
              value={percentageMatch}
              text={`${percentageMatch}%`}
              background={true}
              styles={{
                path: {
                  stroke: "hsl(180, 29%, 50%)",
                },
                trail: {
                  // Trail color
                  stroke: "hsl(180, 52%, 96%)",
                },
                text: {
                  // Text color
                  fill: "hsl(180, 29%, 50%)",
                  // Text size
                  fontSize: "25px",
                },
                background: {
                  fill: "hsl(180, 52%, 96%)",
                },
              }}
              className="bg-LightGrayishCyan rounded-full text-de"
            />
          ) : null}
        </div>
        <SkillsComponent skills={job?.skills} />
      </div>
    </div>
  );
}
