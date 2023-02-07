import { useDispatch } from "react-redux";
import { removeToken } from "../../store/authSlice";


export const logout = () => {
    const dispatch = useDispatch()

    dispatch(removeToken())
}