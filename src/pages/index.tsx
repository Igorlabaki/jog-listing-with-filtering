import type { NextPage } from "next";
import { LayoutComponent } from "../Components/util/layout";
import { SearchComponent } from "../Components/search";
import { JobsComponent } from "../Components/jobs";
import UsersComponent from "../Components/users";
import { useState } from "react";

const Home: NextPage = () => {
  const [mode, setMode] = useState("jobs");
  return (
    <LayoutComponent>
      <SearchComponent />
      <div className="flex gap-x-3 mt-3">
        <button
          onClick={() => setMode("jobs")}
          className="min-w-[100px] bg-desaturatedDarkCyan py-1 px-2 text-white font-bold text-md rounded-md"
        >
          Jobs
        </button>
        <button
          onClick={() => setMode("developers")}
          className="min-w-[100px] bg-desaturatedDarkCyan py-1 px-2 text-white font-bold text-md rounded-md"
        >
          Developers
        </button>
      </div>
      {mode.includes("jobs") ? <JobsComponent /> : <UsersComponent />}
    </LayoutComponent>
  );
};

export default Home;
