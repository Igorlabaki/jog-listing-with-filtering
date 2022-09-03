import { useContext } from "react";

import {SearchContext} from '../Context/SearchContext'

const useSearchContext = () => useContext(SearchContext);

export default useSearchContext