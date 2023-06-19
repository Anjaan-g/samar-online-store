import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { AiFillControl } from "react-icons/ai";

export const Dropdown = ({ header, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div
                className="d-flex justify-content-between align-items-center cp"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <AiFillControl size={20} /> &nbsp;
                    {header}
                </div>
                <MdArrowDropDown size={25} />
            </div>
            {isOpen && (
                <>
                    <hr />
                    <div className="d-flex flex-column">
                        {items.map((item, index) => {
                            return (
                                <div className="ps-2" key={index}>
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
};
