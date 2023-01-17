import React from "react";

export default function Card({ children, class_names }) {
    return <div className={`card ${class_names}`}>{children}</div>;
}
