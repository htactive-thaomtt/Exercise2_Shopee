import { loadState, saveState } from "./localStorange";
import { createStore } from "redux";
import rootReducer from "../Reducers";
// import ProductReducer from "../Reducers/productReducer";

const newload = loadState();
// const store = createStore(rootReducer, newload);

const store = createStore(rootReducer);

// store.subscribe(() => {
//   saveState(store.getState());
// });
export default store;
