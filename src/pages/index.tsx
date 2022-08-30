import type { NextPage } from "next";
import { JobOportunity } from "../Components/jobOportunity";
import { RiCloseFill } from "react-icons/ri";
import { useState } from "react";
import useJobContext from "../hook/useJobContext";
import { LayoutComponent } from "../Components/util/layout";
import { SearchComponent } from "../Components/search";

const Home: NextPage = () => {
  const { search, filterNoResults, setSearch } = useJobContext();

  return (
    <LayoutComponent>
      <SearchComponent />
      <div
        className={`flex flex-col flex-1 min-h-screen space-y-10 md:space-y-2 
        py-5 md:py-0 my-4  md:my-0${search.length > 0 ? "my-[6.5rem]" : null} `}
      >
        {filterNoResults.map((job: any) => {
          return (
            <JobOportunity
              job={job}
              setSearch={setSearch}
              search={search}
              key={job.id}
            />
          );
        })}
      </div>
    </LayoutComponent>
  );
};

export default Home;
