import React, { useEffect, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";
import SelectItemsComponent from "../util/selectItems";
import { JobOportunity } from "./jobOportunity";

export function JobsComponent() {
  const { filterNoResults } = useJobContext();
  const { search, setSearch } = useSearchContext();
  const [orderBy, setOrderBy] = useState("");

  const { authUser } = useAuthContext();

  const userSklls = authUser?.Skills?.map((item: any) => item.skill.text);

  const jobMatchList = filterNoResults.map((job: any) => {
    let percentageMatch = 0;
    let matchSkills = job?.skills?.filter(
      (a: string) => !userSklls?.includes(a)
    );
    if (matchSkills && job?.skills) {
      const x = job.skills.length - matchSkills?.length;
      const skilssMatch = (x * 100) / job?.skills?.length;
      percentageMatch = skilssMatch | 0;
    }

    return { job: job, percentageMatch: percentageMatch };
  });

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-10 md:space-y-2 
    py-5 md:py-0   md:my-0${search.length > 0 ? "my-[6.5rem]" : null} `}
    >
      <SelectItemsComponent
        listOptions={["Skills match"]}
        title={"Order By"}
        setType={setOrderBy}
        type={orderBy}
        handleHidden={true}
        flexRow={true}
      />
      {orderBy.includes("Skills match")
        ? jobMatchList
            .sort((a: any, b: any) => a.percentageMatch - b.percentageMatch)
            .reverse()
            .map((item: any, i: number) => {
              return (
                <JobOportunity
                  job={item.job}
                  percentageMatch={item.percentageMatch}
                  key={i}
                />
              );
            })
        : jobMatchList.map((item: any, i: number) => {
            return (
              <JobOportunity
                job={item.job}
                percentageMatch={item.percentageMatch}
                key={i}
              />
            );
          })}
    </div>
  );
}
