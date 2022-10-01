import { Skill } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { JobsComponent } from "../../Components/jobs";
import { UserDataComponet } from "../../Components/MyProfile/userData";
import { LayoutComponent } from "../../Components/util/layout";
import SkillsComponent from "../../Components/util/skills";
import useCompanyContext from "../../hook/useCompanyContext";
import useJobContext from "../../hook/useJobContext";
import useUserContext from "../../hook/useUserContext";

export default function UserIdPage() {
  const {
    query: { companyId },
  } = useRouter();

  const { company, selectCompanyById } = useCompanyContext();
  const { getCompanyJobs, jobCompanyList } = useJobContext();

  useEffect(() => {
    selectCompanyById(companyId);
  }, []);

  useEffect(() => {
    if (getCompanyJobs && companyId) {
      getCompanyJobs(companyId?.toString());
    }
  }, []);

  return (
    <LayoutComponent>
      <div className="mt-16 bg-white py-3 px-8 rounded-lg shadow-isadora relative w-full">
        <div className={`absolute md:relative`}>
          <div
            className="w-[90px] h-[90px] md:w-[100px] md:h-[100px]  bg-gray-200 rounded-full flex flex-col 
      justify-center items-center relative overflow-hidden bottom-14 lg:bottom-0 lg:left-0 shadow-lg"
          >
            {company?.avatar ? (
              <div className="flex justify-center items-center h-full w-full cursor-pointer rounded-full">
                <img
                  src={company.avatar}
                  className="h-full w-full rounded-full"
                  alt="user avatar"
                />
              </div>
            ) : (
              <FaReact size={30} />
            )}
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between items-center text-desaturatedDarkCyan mt-12 md:mt-3">
            <p className="text-2xl text-veryDarkGraishCyan">{company?.name}</p>
          </div>
          <div className="flex text-sm text-gray-400 gap-x-1">
            <p>{company?.email}</p>
          </div>
          {company?.Country && (
            <div className="flex gap-x-2 mt-1">
              <p className="text-[15px] text-desaturatedDarkCyan">
                Currently Location:
              </p>
              <div className="flex text-veryDarkGraishCyan text-[14px] justify-start items-center space-x-1">
                <p>{company?.Country.name}</p>, <p>{company?.City.name}</p>
              </div>
            </div>
          )}
          <div>
            {company?.about && (
              <div className="flex flex-col  justify-center items-start w-full gap-y-2">
                <p className="text-[15px] text-desaturatedDarkCyan">About:</p>
                <p className="text-veryDarkGraishCyan bg-LightGrayishCyan w-full text-justify tracking-[0.02] text-[14px] rounded-md flex justify-start text-md font-light px-5 py-1 spa">
                  {company.about}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center mt-10">
        <div className="flex gap-x-2 justify-start items-center text-desaturatedDarkCyan">
          <p className=" text-lg ">Job opportunities</p>
          <p>({company?.Jobs?.length || 0})</p>
        </div>
      </div>
      <JobsComponent
        profileCompany={true}
        companyId={company?.id}
        listJobs={jobCompanyList}
      />
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
