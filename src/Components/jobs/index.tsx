import React from "react";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";
import { JobOportunity } from "./jobOportunity";

export function JobsComponent() {
  const { filterNoResults } = useJobContext();
  const { search, setSearch } = useSearchContext();
  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-10 md:space-y-2 
    py-5 md:py-0 my-8  md:my-0${search.length > 0 ? "my-[6.5rem]" : null} `}
    >
      {filterNoResults.map((job: any) => {
        return <JobOportunity job={job} key={job.id} />;
      })}
    </div>
  );
}
