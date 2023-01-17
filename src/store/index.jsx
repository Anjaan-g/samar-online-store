import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../actions/authActions";
import { cartReducer } from "./cartSlice";

import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export default persistReducer