import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_ACTIVE,
  EDIT_PRODUCT_NUMBER,
  LOAD_CARD,
  UPDATE_ACTIVE_ALL,
  ADD_ORDER,
  SEARCH,
} from "../Actions/actionType";

const initialState = {
  list: [
    {
      id: "1",
      name: "Ao thun1",
      cost: 40000,
      numberSold: 5,
      city: "HCM",
      rate: 5,
      date: "2020-07-05",
      url: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
      id: "2",
      name: "Ao thun2",
      cost: 40000,
      numberSold: 5,
      city: "HCM",
      rate: 5,
      date: "2020-07-05",
      url:
        "https://babi.vn/images/companies/1/Up%20hinh%20san%20pham/22507/ao-thun-gia-dinh-cho-be-in-tim-family-de-thuong%20(5).jpg?1532412300691",
    },
    {
      id: "3",
      name: "Ao thun3",
      cost: 40000,
      numberSold: 5,
      city: "HCM",
      rate: 5,
      date: "2020-07-05",
      url: "https://www.w3schools.com/w3images/avatar2.png",
    },
    {
      id: "6",
      name: "Ao khoac",
      cost: 4000000,
      numberSold: 10,
      city: "HCM",
      rate: 3,
      date: "2020-05-05",
      url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSXIp9M5Q4rT_1ehshgdUGg5E9NnDZgYEG-w&usqp=CAU",
    },
    {
      id: "4",
      name: "Giay vans",
      cost: 4000000,
      numberSold: 8,
      city: "HCM",
      rate: 4,
      date: "2020-11-05",
      url: "https://saigonsneaker.com/wp-content/uploads/2019/12/vans.jpg",
    },
  ],
  min: 0,
  cart: [
    { productId: "1", numberBuy: 1, active: true },
    { productId: "2", numberBuy: 4, active: true },
    { productId: "3", numberBuy: 4, active: true },
    { productId: "4", numberBuy: 4, active: true },
  ],
  numberCart: 4,
  orders: [],
  searchProduct: "",
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARD: {
      const min = action.payload;
      state.min = min;
      return state;
    }
    case ADD_PRODUCT: {
      let count = 0;
      state.cart.forEach((item) => {
        if (item.productId === action.payload.productId) {
          count++;
          item.numberBuy = action.payload.numberBuy + item.numberBuy;
        }
      });
      if (count === 0) {
        state.cart = [...state.cart, action.payload];
      }
      state.numberCart = state.cart.length;
      return state;
    }
    case EDIT_PRODUCT_NUMBER: {
      state.cart.forEach((item) => {
        if (item.productId === action.payload.productId) {
          item.numberBuy = action.payload.numberBuy;
        }
      });
      return state;
    }
    case DELETE_PRODUCT: {
      let key = 0;
      state.cart.forEach((item, keyItem) => {
        if (item.productId === action.payload) {
          key = keyItem;
        }
      });
      state.cart.splice(key, 1);
      state.numberCart = state.cart.length;
      return state;
    }
    case EDIT_ACTIVE: {
      state.cart.forEach((item) => {
        if (item.productId === action.payload.id) {
          item.active = action.payload.value;
        }
      });
      return state;
    }
    case UPDATE_ACTIVE_ALL: {
      state.cart.forEach((item) => {
        item.active = action.payload;
      });
      return state;
    }
    case ADD_ORDER: {
      let orders = [...state.orders, action.payload];
      return { ...state, orders };
    }
    case SEARCH: {
      state.searchProduct = action.payload;
      return state;
    }
    default:
      return state;
  }
};
export default productReducer;
