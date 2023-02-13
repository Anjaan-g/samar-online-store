import { combineReducers } from "redux";
import { cartData, deliveryAddress } from "../store";
const rootReducer = combineReducers({
    cart: cartData,
    deliveryAddress: deliveryAddress,
});

export default rootReducer;
