import { Job } from "@prisma/client";
import axios from "axios";
import { createContext, Dispatch, ReactNode, useState, useEffect } from "react";
import { listJobs } from "../database/jobs";
import useAuthContext from "../hook/useAuthContext";
import useCompanyContext from "../hook/useCompanyContext";
import useSearchContext from "../hook/useSearchSContext";
import useUserContext from "../hook/useUserContext";

interface JobContextProvider {
  children: ReactNode;
}
interface JobContext {
  job?: Job;
  jobList?: any;
  jobCompanyList?: any;
  handleFeatured?: any;
  newJogoLoading?: boolean;
  handleNew?: any;
  getAllJobs?: () => any;
  getCompanyJobs?: (id: string) => any;
  createJob?: (bodReq: any) => any;
  deleteJob?: (jobId: string) => any;
  getJob?: (jobId: string) => any;
}

const initialState: JobContext = {};

export const JobContext = createContext<JobContext>(initialState);

export function JobContextProvider({ children }: JobContextProvider) {
  const { search, setSearch } = useSearchContext();
  const { selectCompanyById } = useCompanyContext();
  const { authUser } = useAuthContext();
  const [job, setJob] = useState<any>([]);
  const [jobList, setJobList] = useState<any>([]);
  const [jobCompanyList, setCompanyJobs] = useState<any>([]);
  const [newJogoLoading, setNewJogoLoading] = useState(false);

  async function createJob(bodyReq: any) {
    setNewJogoLoading(true);
    const jobCreated = await axios
      .post("/api/job", bodyReq)
      .then((resp) => resp.data);

    getCompanyJobs(bodyReq?.user?.id);
    selectCompanyById(bodyReq?.user?.id);
    setNewJogoLoading(false);
  }

  async function getAllJobs() {
    const jobs: Job[] = await axios.get(`/api/job`).then((resp) => resp.data);
    setJobList(() => jobs);
  }

  async function getCompanyJobs(id: string) {
    setNewJogoLoading(true);
    const companyJobs: Job[] = await axios
      .get(`/api/job/${"getCompanyJobsId"}/${id}`)
      .then((resp) => resp.data);
    setCompanyJobs(() => companyJobs);
    setNewJogoLoading(false);
  }

  async function getJob(id: string) {
    setNewJogoLoading(true);
    const job: Job[] = await axios
      .get(`/api/job/${"getJobById"}/${id}`)
      .then((resp) => resp.data);
    setJob(() => job);
    setNewJogoLoading(false);
  }

  async function deleteJob(jobId: string) {
    const jobDleted: any = await axios
      .delete(`/api/job/${jobId}`)
      .then((resp) => {
        return resp.data;
      });

    getCompanyJobs(jobDleted?.companyId);
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  // async function selectCompanyById(id: string) {
  //   const company: Company = await axios
  //     .get(`/api/company/${"getCompanyById"}/${id}`)
  //     .then((resp) => resp.data);
  //   setCompany(() => company);
  // }

  return (
    <JobContext.Provider
      value={{
        createJob,
        job,
        getAllJobs,
        jobList,
        getCompanyJobs,
        jobCompanyList,
        newJogoLoading,
        deleteJob,
        getJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

// const filterNoResults = listOrder.filter((job) => {
//   const list = [];
//   for (let index = 0; index < search.length; index++) {
//     const filterCase = job.skills.map((job) => job.toLocaleUpperCase());
//     if (filterCase.includes(search[index].toLocaleUpperCase())) {
//       list.push(true);
//     } else {
//       list.push(false);
//     }
//   }
//   return list.every((job) => job === true);
// });
