import "../styles/globals.css";
import type { AppProps } from "next/app";
import { JobContextProvider } from "../Context/jobContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JobContextProvider>
      <Component {...pageProps} />
    </JobContextProvider>
  );
}

export default MyApp;
