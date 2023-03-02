import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { BrowserRouter as Router } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import * as bootstrap from "bootstrap";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import "react-toastify/dist/ReactToastify.css";
import rootReducer from "./reducers/rootReducer";
import { usersAddressSlice } from "./store/addressSlice";
import { persistStore } from "redux-persist";
import { userHistorySlice } from "./store/historySlice";
import { userReturnsSlice } from "./store/returnsSlice";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersAddressSlice.middleware)
            .concat(userHistorySlice.middleware)
            .concat(userReturnsSlice.middleware),
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
