import type { GetServerSideProps, NextPage } from "next";
import { LayoutComponent } from "../Components/util/layout";
import { SearchComponent } from "../Components/util/search";
import { JobsComponent } from "../Components/jobs";
import UsersComponent from "../Components/users";
import { useEffect, useState } from "react";
import useAuthContext from "../hook/useAuthContext";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { CompanyComponent } from "../Components/companies/company";
import CompaniesComponent from "../Components/companies";
import useJobContext from "../hook/useJobContext";

const Home: NextPage = () => {
  const [mode, setMode] = useState("jobs");
  const { setAuthUser, authUser, recoverUserInformation } = useAuthContext();
  const { jobList } = useJobContext();
  useEffect(() => {
    const { userToken: uToken, companyToken: cToken } = parseCookies();

    if (uToken) {
      recoverUserInformation(uToken, "developer");
    } else if (cToken) {
      recoverUserInformation(cToken, "company");
    }
  }, []);
  return (
    <LayoutComponent>
      <SearchComponent />
      <div className="flex gap-x-1 mt-3 w-full">
        <button
          onClick={() => setMode("companies")}
          className={`${
            mode.includes("companies") ? "shadow-lg" : "opacity-50 "
          }
          min-w-[100px] bg-desaturatedDarkCyan py-1 w-[50%] px-2 text-white font-light text-md rounded-md`}
        >
          Companies
        </button>
        <button
          onClick={() => setMode("jobs")}
          className={`${mode.includes("jobs") ? "shadow-lg" : "opacity-50 "}
          min-w-[100px] bg-desaturatedDarkCyan py-1 w-[50%] px-2 text-white font-light text-md rounded-md`}
        >
          Jobs
        </button>
        <button
          onClick={() => {
            setMode("developers");
          }}
          className={` ${
            mode.includes("developers") ? "shadow-lg" : "opacity-50"
          }
          min-w-[100px] bg-desaturatedDarkCyan w-[50%] py-1 px-2 text-white font-light text-md rounded-md
          hover:opacity-80
          `}
        >
          Developers
        </button>
      </div>
      {mode.includes("jobs") ? (
        <JobsComponent listJobs={jobList} />
      ) : mode.includes("developers") ? (
        <UsersComponent />
      ) : (
        <CompaniesComponent />
      )}
    </LayoutComponent>
  );
};

export default Home;
