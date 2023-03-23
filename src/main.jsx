import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { BrowserRouter as Router } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";

import rootReducer from "./reducers/rootReducer";
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
import { apiSlice } from "./store/apiSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router>
                <Layout children={<App />} />
                <ToastContainer />
            </Router>
        </PersistGate>
    </Provider>
);
