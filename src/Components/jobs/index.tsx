import { Job } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import useJobContext from "../../hook/useJobContext";
import useSearchContext from "../../hook/useSearchSContext";
import SelectItemsComponent from "../util/selectItems";
import { JobOportunity } from "./jobOportunity";

interface JobProps {
  profileUser?: boolean;
  profileCompany?: boolean;
  companyId?: string;
  listJobs?: Job[];
}

export function JobsComponent({
  profileUser,
  profileCompany,
  companyId,
  listJobs,
}: JobProps) {
  const { search, setSearch } = useSearchContext();
  const [orderBy, setOrderBy] = useState("");

  const { authUser } = useAuthContext();

  const userSklls = authUser?.Skills?.map((item: any) => item.skill.text);

  function percentageJob(list: any) {
    return list?.map((job: any) => {
      let percentageMatch = 0;
      let matchSkills = job?.Skills?.filter(
        (item: any) => !userSklls?.includes(item.skill.text)
      );
      if (matchSkills && job?.Skills) {
        const x = job.Skills.length - matchSkills?.length;
        const skilssMatch = (x * 100) / job?.Skills?.length;
        percentageMatch = skilssMatch | 0;
      }

      return { job: job, percentageMatch: percentageMatch };
    });
  }

  return (
    <div
      className={`${
        profileUser ? "mt-10" : profileCompany ? "mt-8" : "mt-8 md:mt-9"
      }
      flex flex-col flex-1 min-h-screen gap-y-16 md:gap-y-[2px] md:space-y-2
    py-5 md:py-0   md:my-0 ${search?.length > 0 ? "my-[6.5rem]" : null} `}
    >
      {!profileUser && authUser?.Skills?.length > 0 && (
        <SelectItemsComponent
          listOptions={["Skills match"]}
          title={"Order By"}
          setType={setOrderBy}
          type={orderBy}
          handleHidden={true}
          flexRow={true}
        />
      )}
      {percentageJob(listJobs)?.map((item: any, i: number) => {
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

// {!profileUser && authUser?.Skills?.length > 0 && (
//   <SelectItemsComponent
//     listOptions={["Skills match"]}
//     title={"Order By"}
//     setType={setOrderBy}
//     type={orderBy}
//     handleHidden={true}
//     flexRow={true}
//   />
// )}
// {profileUser
//   ? percentageJob(jobList)
//       .sort((a: any, b: any) => b.percentageMatch - a.percentageMatch)
//       .slice(0, 3)
//       .map((item: any, i: number) => {
//         return (
//           <JobOportunity
//             job={item.job}
//             percentageMatch={item.percentageMatch}
//             key={i}
//           />
//         );
//       })
//   : profileCompany
//   ? percentageJob(jobCompanyList).map((item: any, i: number) => {
//       return (
//         <JobOportunity
//           job={item.job}
//           percentageMatch={item.percentageMatch}
//           key={i}
//         />
//       );
//     })
//   : orderBy.includes("Skills match")
//   ? percentageJob(jobList)
//       .sort((a: any, b: any) => a.percentageMatch - b.percentageMatch)
//       .reverse()
//       .map((item: any, i: number) => {
//         return (
//           <JobOportunity
//             job={item.job}
//             percentageMatch={item.percentageMatch}
//             key={i}
//           />
//         );
//       })
//   : percentageJob(jobList).map((item: any, i: number) => {
//       return (
//         <JobOportunity
//           job={item.job}
//           percentageMatch={item.percentageMatch}
//           key={i}
//         />
//       );
//     })}
