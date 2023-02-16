import { cartReducer } from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { addressReducer } from "./addressSlice";
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
