import { combineReducers } from "redux";

import getMainDataReducers from "./getMainDataReducers";
import getSingleItemReducers from "./getSingleItemReducers";
import getAuthenticationReducers from "./getAuthenticationReducers";
import getLoginReducers from "./getLoginReducers";
import getWishlistReducers from "./getWishlistReducers";
import getBagListReducers from "./getBagListReducers";
import getPlacedOrderReducers from "./getPlacedOrderReducers";

export default combineReducers({
  getMainDataReducers,
  getSingleItemReducers,
  getAuthenticationReducers,
  getLoginReducers,
  getWishlistReducers,
  getBagListReducers,
  getPlacedOrderReducers,
});
