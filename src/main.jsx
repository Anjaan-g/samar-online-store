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
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import "react-toastify/dist/ReactToastify.css";
import rootReducer from "./reducers/rootReducer";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const store = configureStore({
    reducer: rootReducer,
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
