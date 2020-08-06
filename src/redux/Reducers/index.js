import productReducer from "./productReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cards: productReducer,
});
export default rootReducer;
