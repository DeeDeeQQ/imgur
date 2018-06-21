import { combineReducers } from "redux";

import galleriesList from "./galleriesList";
import tags from "./tags";

export default combineReducers({
  galleriesList,
  tags
});
