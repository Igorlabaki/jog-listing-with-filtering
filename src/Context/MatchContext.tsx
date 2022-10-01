import { Skill } from "@prisma/client";
import { createContext, Dispatch, ReactNode, useState } from "react";
import { listJobs } from "../database/jobs";
import useAuthContext from "../hook/useAuthContext";
import useJobContext from "../hook/useJobContext";
import useSearchContext from "../hook/useSearchSContext";
import { Job } from "../Interfaces";
interface MatchContextProvider {
  children: ReactNode;
}
interface MatchContext {
  matchUserJob?: () => void;
  percentageMatch?: number | undefined;
}

const initialState: MatchContext = {};

export const MatchContext = createContext<MatchContext>(initialState);

export function MatchContextProvider({ children }: MatchContextProvider) {
  const { authUser } = useAuthContext();
  const { job } = useJobContext();

  const [percentageMatch, setPercentageMatch] = useState<number>();

  function matchUserJob() {
    console.log(job?.skills);
    const userSklls = authUser?.Skills?.map((item: any) => item.skill.text);

    let r3 = job?.skills?.filter((a: string) => !userSklls.includes(a));

    if (r3 && job?.skills) {
      const skilssMatch = (r3?.length * 100) / job?.skills?.length;
      setPercentageMatch(() => skilssMatch);
    }
  }

  return (
    <MatchContext.Provider value={{ matchUserJob, percentageMatch }}>
      {children}
    </MatchContext.Provider>
  );
}
