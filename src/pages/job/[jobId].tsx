import { Skill } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { LayoutComponent } from "../../Components/util/layout";
import SkillsComponent from "../../Components/util/skills";
import useAuthContext from "../../hook/useAuthContext";
import useJobContext from "../../hook/useJobContext";
import useMatchContext from "../../hook/useMatchContext";

export default function JobId() {
  const {
    query: { jobId },
  } = useRouter();

  const { selectJobId, job, handleFeatured, handleNew } = useJobContext();
  const { authUser } = useAuthContext();
  const { matchUserJob, percentageMatch } = useMatchContext();
  const router = useRouter();
  useEffect(() => selectJobId(jobId?.toString()), []);

  useEffect(() => {
    if (matchUserJob) {
      matchUserJob();
    }
  }, []);

  return (
    <LayoutComponent>
      <div
        className="flex justify-start items-center gap-1 mt-2"
        onClick={() => router.push("/")}
      >
        <RiArrowLeftSLine
          size={25}
          className={"text-desaturatedDarkCyan cursor-pointer "}
        />
      </div>
      <div className="flex justify-center md:justify-start flex-col md:flex-row md:mr-4 w-[100%] py-5 px-3 rounded-md shadow-pattern md:gap-4 bg-white mt-5">
        <div className="flex md:flex-col justify-between md:justify-start md:space-y-3 items-center">
          <div className="w-[100px] h-[100px] mr-2 rounded-full shadow-lg">
            <img src={job?.image} alt="" className="h-full w-full" />
          </div>
        </div>
        <div className="md:w-[70%] mt-4 md:[mt-0]">
          <div className="flex justify-between">
            <h2 className="text-justify font-bold text-3xl text-desaturatedDarkCyan">
              {job?.company}
            </h2>
          </div>
          <h3 className="text-justify  font-semibold text-2xl text-black">
            {job?.job_title}
          </h3>
          <div className="flex space-x-3 text-[13px] text-darkGrayishYan font-light">
            <p>{job?.create_at}</p>
            <p>{job?.region}</p>
            <p>{job?.period}</p>
          </div>
          <div className="mt-3 flex flex-col  justify-center items-start w-full">
            <p className="text-[15px] text-desaturatedDarkCyan">
              About the Job:
            </p>
            <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              iste sapiente, commodi, nobis animi, vitae perferendis eligendi
              optio culpa consequatur aspernatur dolorum quibusdam provident
              dolor similique. Voluptatem dignissimos minus earum?
            </p>
          </div>
          <hr className="h-3 my-2" />
          <div className="flex justify-start items-center text-[12px] gap-x-2 text-desaturatedDarkCyan font-bold flex-wrap gap-y-2">
            <p className="font-light">Skills required:</p>
            <SkillsComponent skills={job?.skills || [""]} />
          </div>
        </div>
      </div>
      <div className="h-6 w-full bg-white mt-10 flex flex-col justify-center items-start px-3 rounded-lg py-5 pb-10">
        <p className="text-desaturatedDarkCyan text-lg font-bold ">Match:</p>
        <div></div>
      </div>
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["userToken"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
