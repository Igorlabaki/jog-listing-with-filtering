import { Skill } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { JobOportunity } from "../../Components/jobs/jobOportunity";
import { LayoutComponent } from "../../Components/util/layout";
import SkillsComponent from "../../Components/util/skills";
import useAuthContext from "../../hook/useAuthContext";
import useJobContext from "../../hook/useJobContext";
import useMatchContext from "../../hook/useMatchContext";

export default function JobId() {
  const {
    query: { jobId },
  } = useRouter();

  const { job, getJob } = useJobContext();
  const { authUser } = useAuthContext();
  const { matchUserJob, percentageMatch } = useMatchContext();
  const router = useRouter();

  useEffect(() => {
    if (getJob && jobId) {
      getJob(jobId.toString());
    }
  }, []);

  return (
    <LayoutComponent>
      <div className="mt-16">
        <JobOportunity job={job} />
      </div>
    </LayoutComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["userToken"]: userToken } = parseCookies(ctx);
  const { ["companyToken"]: companyToken } = parseCookies(ctx);

  if (!userToken && !companyToken) {
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
