import { useContext } from "react";

import {MatchContext} from '../Context/MatchContext'

const useMatchContext = () => useContext(MatchContext)

export default useMatchContext