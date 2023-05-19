import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

import "./search.scss";
// import {useResultContext} from "../../contexts/ResultContextProvider"

export const Search = ({searchTerm, setSearchTerm}) => {
    const [text, setText] = useState("");
    const [debounceValue] = useDebounce(text, 300);

    return (
        <div className="search d-flex justify-content-center align-items-center">
            <AiOutlineSearch className="searchIcon" />
            <input
                value={text}
                type="text"
                placeholder="Searching for..."
                onChange={(e) => setText(e.target.value)}
            />
            <span className="d-inline">
                {text && (
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setText("")}
                    >
                        <MdCancel size={20}/>
                    </button>
                )}
            </span>
            
        </div>
    );
};
