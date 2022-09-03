import { createContext, Dispatch, ReactNode, useState } from "react";
import { listJobs } from "../database/jobs";
import { Job } from "../Interfaces";
interface SearchContextProvider {
  children: ReactNode;
}
interface SearchContext {
  search: any;
  setSearch?: any;
}

const initialState: SearchContext = {
  search: [],
};

export const SearchContext = createContext<SearchContext>(initialState);

export function SearchContextProvider({ children }: SearchContextProvider) {
  const [search, setSearch] = useState<any>([]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
