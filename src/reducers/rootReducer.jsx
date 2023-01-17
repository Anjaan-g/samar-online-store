import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { cartReducer } from "../store/cartSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;
