import "../styles/globals.css";
import type { AppProps } from "next/app";
import { JobContextProvider } from "../Context/jobContext";
import { SearchContextProvider } from "../Context/SearchContext";
import { AuthContextProvider } from "../Context/AuthContext";
import { UserContextProvider } from "../Context/UserContext";
import { MatchContextProvider } from "../Context/MatchContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <JobContextProvider>
            <MatchContextProvider>
              <Component {...pageProps} />
            </MatchContextProvider>
          </JobContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </SearchContextProvider>
  );
}

export default MyApp;
