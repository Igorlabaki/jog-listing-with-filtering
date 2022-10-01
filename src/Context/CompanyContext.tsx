import { Company, User } from "@prisma/client";
import axios from "axios";
import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import useAuthContext from "../hook/useAuthContext";
import useSearchContext from "../hook/useSearchSContext";

interface CompanyContextProvider {
  children: ReactNode;
}
interface CompanyContext {
  company?: any;
  companiesList?: any;
  selectCompanyById: (id: any) => any;
  getAllCompanies?: () => void;
}

const initialState: CompanyContext = {
  selectCompanyById: () => {},
};

export const CompanyContext = createContext<CompanyContext>(initialState);

export function CompanyContextProvider({ children }: CompanyContextProvider) {
  const { authUser, setAuthUser } = useAuthContext();
  const [companiesList, setCompaniesList] = useState<any>();
  const [company, setCompany] = useState<any>();
  const { search, setSearch } = useSearchContext();
  const userSklls = authUser?.Skills?.map((item: any) => item.skill.text);

  async function getAllCompanies() {
    const companys: Company[] = await axios
      .get(`/api/company`)
      .then((resp) => resp.data);
    setCompaniesList(() => companys);
  }

  async function selectCompanyById(id: string) {
    const company: Company = await axios
      .get(`/api/company/${"getCompanyById"}/${id}`)
      .then((resp) => resp.data);
    setCompany(() => company);
  }

  function percentageJob(list: any) {
    return list.map((job: any) => {
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

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <CompanyContext.Provider
      value={{ companiesList, selectCompanyById, company, getAllCompanies }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
