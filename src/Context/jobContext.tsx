import { createContext, Dispatch, ReactNode, useState } from "react";
import { listJobs } from "../database/data";
import { Job } from "../Interfaces";
interface JobContextProvider {
  children: ReactNode;
}
interface JobContext {
  search: any;
  job?: Job;
  setSearch?: any;
  filterNoResults?: any;
  listOrder?: any;
  handleFeatured?: any;
  handleNew?: any;
  selectJobId: (id: any) => any;
}

const initialState: JobContext = {
  search: [],
  selectJobId: () => {},
};

export const JobContext = createContext<JobContext>(initialState);

export function JobContextProvider({ children }: JobContextProvider) {
  const [search, setSearch] = useState<any>([]);
  const [job, setJob] = useState<any>([]);

  const listOrder = listJobs.map((job) => {
    job.skills.sort();
    return job;
  });

  const filterNoResults = listOrder.filter((item) => {
    const list = [];

    for (let index = 0; index < search.length; index++) {
      const filterCase = item.skills.map((item) => item.toLocaleUpperCase());
      if (filterCase.includes(search[index].toLocaleUpperCase())) {
        list.push(true);
      } else {
        list.push(false);
      }
    }
    return list.every((item) => item === true);
  });

  function selectJobId(id: string) {
    const job = listJobs.find((job) => job.id === id);
    setJob(job);
  }

  function handleNew() {
    if (job?.new) {
      return (
        <div className="bg-desaturatedDarkCyan flex justify-center items-center px-2 text-white text-[10px] font-bold rounded-full">
          <p>NEW!</p>
        </div>
      );
    }
  }

  function handleFeatured() {
    if (job?.featured) {
      return (
        <div className="bg-veryDarkGraishCyan flex justify-center items-center px-2 text-white text-[10px] font-bold rounded-full">
          <p>FEATURED</p>
        </div>
      );
    }
  }

  return (
    <JobContext.Provider
      value={{
        search,
        setSearch,
        filterNoResults,
        selectJobId,
        job,
        handleFeatured,
        handleNew,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
