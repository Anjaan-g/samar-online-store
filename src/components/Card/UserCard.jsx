import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "../../actions/themeActions";
import "./Card.scss";


export default function UserCard({ darkTheme, setDarkTheme }) {
    const themeMode = useSelector((state) => state.themeMode);
    const dispatch = useDispatch();
    const token = useSelector((token) => token);

    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (themeMode) {
            setDarkTheme(themeMode);
        }
    }, [themeMode]);

    const toggleDarkMode = () => {
        setDarkTheme(!darkTheme);
        dispatch(setThemeMode(darkTheme));
    };

    return (
        <div
            className={`user-profile ${hidden && "hidden"}`}
            onClick={() => setHidden(false)}
        >
            <div className="card-body">
                <div className="theme">
                    {/* <Toggle label={"Dark"}/> */}
                </div>
            </div>
        </div>
    );
}
