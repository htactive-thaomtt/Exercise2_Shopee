import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_ACTIVE,
  EDIT_PRODUCT_NUMBER,
  LOAD_CARD,
  UPDATE_ACTIVE_ALL,
  ADD_ORDER,
  SEARCH,
} from "./actionType";

export const loadCard = (min) => {
  return { type: LOAD_CARD, payload: min };
};
export const addProduct = (numberAndId) => {
  return { type: ADD_PRODUCT, payload: numberAndId };
};
export const editProductNumber = (numberAndId) => {
  return { type: EDIT_PRODUCT_NUMBER, payload: numberAndId };
};
export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, payload: id };
};
export const editActive = (activeAndId) => {
  return { type: EDIT_ACTIVE, payload: activeAndId };
};
export const updateActiveAll = (active) => {
  return { type: UPDATE_ACTIVE_ALL, payload: active };
};
export const addOrder = (order) => {
  return { type: ADD_ORDER, payload: order };
};
export const searchProduct = (search) => {
  return { type: SEARCH, payload: search };
};
