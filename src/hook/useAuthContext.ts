import { useContext } from "react";

import {AuthContext} from '../Context/AuthContext'

const useAuthContext = () => useContext(AuthContext)

export default useAuthContext