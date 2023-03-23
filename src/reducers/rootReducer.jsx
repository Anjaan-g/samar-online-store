import { combineReducers } from "redux";
import { deliveryAddress } from "../store";
import { usersAddressSlice } from "../store/addressSlice";
import { userHistorySlice } from "../store/historySlice";
import { userReturnsSlice } from "../store/returnsSlice";
import { userDataSlice } from "../store/userDataSlice";
import { cartReducer } from "../store/cartSlice";

const rootReducer = combineReducers({
    deliveryAddress: deliveryAddress,
    cart: cartReducer,
    [usersAddressSlice.reducerPath]: usersAddressSlice.reducer,
    [userHistorySlice.reducerPath]: userHistorySlice.reducer,
    [userReturnsSlice.reducerPath]: userReturnsSlice.reducer,
    [userDataSlice.reducerPath]: userDataSlice.reducer,
});

export default rootReducer;
