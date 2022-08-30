import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { LayoutComponent } from "../Components/util/layout";
import useJobContext from "../hook/useJobContext";

export default function JobId() {
  const {
    query: { id },
  } = useRouter();

  const { selectJobId, job, handleFeatured, handleNew } = useJobContext();

  useEffect(() => selectJobId(id?.toString()), []);

  return (
    <LayoutComponent>
      <div className="flex flex-col md:flex-row md:mr-4 w-[100%] py-10 md:gap-4">
        <div className="flex md:flex-col justify-between md:justify-start md:space-y-3 items-center">
          <div className="w-[100px] h-[100px] mr-2 rounded-full shadow-lg">
            <img src={job?.image} alt="" className="h-full w-full" />
          </div>
          <button className="bg-desaturatedDarkCyan text-white font-bold py-1 px-2 rounded-lg shadow-lg hover:shadow-none hover:brightness-105">
            Apply now
          </button>
        </div>
        <div className="md:w-[70%] mt-4 md:[mt-0]">
          <div className="flex justify-between">
            <h2 className="text-justify font-bold text-3xl text-desaturatedDarkCyan">
              {job?.company}
            </h2>
            <div className="flex h-15 justify-center items-center space-x-1">
              {handleNew()}
              {handleFeatured()}
            </div>
          </div>
          <h3 className="text-justify  font-semibold text-2xl text-black">
            {job?.job_title}
          </h3>
          <div className="flex space-x-2 text-[12px] font-semibold text-gray-500">
            <p>{job?.create_at}</p>
            <p>{job?.region}</p>
            <p>{job?.period}</p>
          </div>
          <p className="text-justify text-sm mt-4 font-semibold">
            About the job:
          </p>
          <p className="text-justify text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
            sapiente, commodi, nobis animi, vitae perferendis eligendi optio
            culpa consequatur aspernatur dolorum quibusdam provident dolor
            similique. Voluptatem dignissimos minus earum?
          </p>
          <hr className="h-3 my-2" />
          <div className="flex justify-start items-center text-[12px] space-x-2 text-desaturatedDarkCyan font-bold break-words">
            <p>Skills required:</p>
            {job?.skills?.map((skill, i) => {
              return (
                <div key={i}>
                  <p
                    className={`  p-1 shadow-md rounded-sm bg-desaturatedDarkCyan text-white cursor-pointer max-w-[100px] flex-wrap`}
                    onClick={() => {}}
                  >
                    {skill}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
