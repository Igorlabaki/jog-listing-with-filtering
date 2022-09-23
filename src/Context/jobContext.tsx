import { createContext, Dispatch, ReactNode, useState } from "react";
import { listJobs } from "../database/jobs";
import useSearchContext from "../hook/useSearchSContext";
import { Job } from "../Interfaces";
interface JobContextProvider {
  children: ReactNode;
}
interface JobContext {
  job?: Job;
  filterNoResults?: any;
  listOrder?: any;
  handleFeatured?: any;
  handleNew?: any;
  selectJobId: (id: any) => any;
}

const initialState: JobContext = {
  selectJobId: () => {},
};

export const JobContext = createContext<JobContext>(initialState);

export function JobContextProvider({ children }: JobContextProvider) {
  const { search, setSearch } = useSearchContext();
  const [job, setJob] = useState<any>([]);

  const listOrder = listJobs.map((job) => {
    job.skills.sort();
    return job;
  });

  const filterNoResults = listOrder.filter((job) => {
    const list = [];
    for (let index = 0; index < search.length; index++) {
      const filterCase = job.skills.map((job) => job.toLocaleUpperCase());
      if (filterCase.includes(search[index].toLocaleUpperCase())) {
        list.push(true);
      } else {
        list.push(false);
      }
    }
    return list.every((job) => job === true);
  });

  function selectJobId(id: string) {
    const job = listJobs.find((job) => job.id === id);
    setJob(job);
  }

  return (
    <JobContext.Provider
      value={{
        filterNoResults,
        selectJobId,
        job,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
