import { useContext } from "react";

import {CompanyContext} from '../Context/CompanyContext'

const useCompanyContext = () => useContext(CompanyContext)

export default useCompanyContext