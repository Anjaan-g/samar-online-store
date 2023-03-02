import { combineReducers } from "redux";
import { cartData, deliveryAddress, userData } from "../store";
import { usersAddressSlice } from "../store/addressSlice";
import { userHistorySlice } from "../store/historySlice";
import { userReturnsSlice } from "../store/returnsSlice";
import { userDataSlice } from "../store/userDataSlice";

const rootReducer = combineReducers({
    cart: cartData,
    deliveryAddress: deliveryAddress,
    auth: userData,
    [usersAddressSlice.reducerPath]: usersAddressSlice.reducer,
    [userHistorySlice.reducerPath]: userHistorySlice.reducer,
    [userReturnsSlice.reducerPath]: userReturnsSlice.reducer,
    [userDataSlice.reducerPath]: userDataSlice.reducer,
});

export default rootReducer;
