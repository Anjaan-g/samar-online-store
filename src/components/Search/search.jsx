import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { AiOutlineSearch } from "react-icons/ai";

import "./search.scss";
// import {useResultContext} from "../../contexts/ResultContextProvider"

export const Search = () => {
    const [text, setText] = useState("");
    // const {setSearchTerm} = useResultContext()
    const [debounceValue] = useDebounce(text, 300);

    // useEffect(() => {
    //     if (debounceValue) setSearchTerm(debounceValue)
    // }, [debounceValue])

    return (
        <div className="search flex">
            <AiOutlineSearch className="searchIcon" />
            <input
                value={text}
                type="text"
                placeholder="Searching for..."
                onChange={(e) => setText(e.target.value)}
            />
            <span>
                {text && (
                    <button
                        type="button"
                        className="absoulute top-1.5 right-4 text-2xl text-gray-500"
                        onClick={() => setText("")}
                    >
                        X
                    </button>
                )}
            </span>
        </div>
    );
};
