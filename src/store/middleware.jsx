import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { refresh } from "../services/axios";
import { setToken } from "./authSlice";

export const checkTokenValidity =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        // const dispatch = useDispatch();
        const state = getState();
        const accessToken = state.auth.accessToken;
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const expiry = new Date(decodedToken.exp * 1000);
            if (expiry < new Date()) {
                dispatch();
            }
        }
        return next(action);
    };

export const refreshAccessTokenMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        const state = getState();
        const accessToken = state.auth.accessToken;
        const localAccessTOken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const expiratonDate = new Date(decodedToken.exp * 1000);
            if (expiratonDate < new Date()) {
                const refreshToken = state.auth.refreshToken;
                refresh({ refreshToken })
                    .then(({ accessToken }) => {
                        dispatch(setToken({ accessToken, refreshToken }));
                    })
                    .catch((error) => {});
            }
        }
    };
