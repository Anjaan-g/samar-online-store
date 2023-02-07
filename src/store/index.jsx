import { cartReducer } from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "cart",
    storage,
};


export const cartData = persistReducer(persistConfig, cartReducer);
