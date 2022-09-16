import type { GetServerSideProps, NextPage } from "next";
import { LayoutComponent } from "../Components/util/layout";
import { SearchComponent } from "../Components/search";
import { JobsComponent } from "../Components/jobs";
import UsersComponent from "../Components/users";
import { useEffect, useState } from "react";
import useAuthContext from "../hook/useAuthContext";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const Home: NextPage = () => {
  const [mode, setMode] = useState("jobs");
  const { setAuthUser, authUser, recoverUserInformation } = useAuthContext();

  useEffect(() => {
    const { userToken } = parseCookies();
    if (userToken) {
      recoverUserInformation(userToken);
    }
  }, []);

  return (
    <LayoutComponent>
      <SearchComponent />
      <div className="flex gap-x-3 mt-3 w-full">
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
      {mode.includes("jobs") ? <JobsComponent /> : <UsersComponent />}
    </LayoutComponent>
  );
};

export default Home;
