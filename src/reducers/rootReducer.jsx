import { combineReducers } from "redux";
import { deliveryAddress } from "../store";
import { usersAddressSlice } from "../store/addressSlice";
import { userHistorySlice } from "../store/historySlice";
import { userReturnsSlice } from "../store/returnsSlice";
import { userDataSlice } from "../store/userDataSlice";
import { cartReducer } from "../store/cartSlice";
import { productSlice } from "../store/productSlice";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistStore,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
    key: "cart",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    deliveryAddress: deliveryAddress,
    cart: persistReducer(cartPersistConfig, cartReducer),
    [usersAddressSlice.reducerPath]: usersAddressSlice.reducer,
    [userHistorySlice.reducerPath]: userHistorySlice.reducer,
    [userReturnsSlice.reducerPath]: userReturnsSlice.reducer,
    [userDataSlice.reducerPath]: userDataSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
});

export default rootReducer;
