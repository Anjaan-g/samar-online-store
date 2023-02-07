import { combineReducers } from "redux";
import { cartData } from "../store";
const rootReducer = combineReducers({
    cart: cartData,
});

export default rootReducer;
