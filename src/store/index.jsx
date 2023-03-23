import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { addressReducer } from "./deliveryAddressSlice";


const deliveryAddressConfig = {
    key: "deliveryAddress",
    storage,
};


export const deliveryAddress = persistReducer(
    deliveryAddressConfig,
    addressReducer
);

