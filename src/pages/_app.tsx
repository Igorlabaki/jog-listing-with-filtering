import "../styles/globals.css";
import type { AppProps } from "next/app";
import { JobContextProvider } from "../Context/jobContext";
import { UserContextProvider } from "../Context/UserContext";
import { SearchContextProvider } from "../Context/SearchContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <UserContextProvider>
        <JobContextProvider>
          <Component {...pageProps} />
        </JobContextProvider>
      </UserContextProvider>
    </SearchContextProvider>
  );
}

export default MyApp;
