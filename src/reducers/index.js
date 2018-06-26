import { combineReducers } from "redux";

import galleriesList from "./galleriesList";
import tags from "./tags";
import noData from "./noData";

export default combineReducers({
  galleriesList,
  tags,
  noData
});
