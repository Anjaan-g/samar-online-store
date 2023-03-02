import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { cartReducer } from "./cartSlice";
import { addressReducer } from "./deliveryAddressSlice";
import { authReducer } from "./authSlice";

const persistConfig = {
    key: "cart",
    storage,
};
const deliveryAddressConfig = {
    key: "deliveryAddress",
    storage,
};

const userConfig = {
    key: "user",
    storage,
};


export const cartData = persistReducer(persistConfig, cartReducer);

export const deliveryAddress = persistReducer(
    deliveryAddressConfig,
    addressReducer
);
export const userData = persistReducer(userConfig, authReducer);

