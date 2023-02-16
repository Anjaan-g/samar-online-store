import { combineReducers } from "redux";
import { cartData, deliveryAddress, userData } from "../store";
const rootReducer = combineReducers({
    cart: cartData,
    deliveryAddress: deliveryAddress,
    auth: userData,
});

export default rootReducer;
