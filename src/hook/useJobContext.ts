import { useContext } from "react";

import {JobContext} from '../Context/jobContext'

const useJobContext = () => useContext(JobContext)

export default useJobContext