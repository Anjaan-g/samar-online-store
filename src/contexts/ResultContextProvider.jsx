import { createContext, useContext, useState } from "react";
import React from "react";

const ResultContext = createContext();

const baseURL = "http://localhost:8000/api/v1/";

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const getResults = async (type) => {
        setIsLoading(true);

        const response = await fetch(`${baseURL}${type}`, {
            method: "GET",
            headers: {
                "x-user-agent": "desktop",
                authorization: `bearer ${token}`,
            },
        });

        const data = await response.json();
    };
};
