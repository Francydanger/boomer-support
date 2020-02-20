import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header(props) {
    console.log("props in header: ", props);
    const users = useSelector(state => state && state.users);

    return (
        <div className="header">
            <h3 className="header-heading">
                Welcome, <br></br>
                {`${users.first} ${users.last}`}
            </h3>
            <button className="button" name="button">
                <Link className="link" to="/home">
                    Home
                </Link>
            </button>
            <button className="button" name="button">
                <Link className="link" to="/videos">
                    Videos
                </Link>
            </button>
            <button className="button" name="button">
                <Link className="link" to="/chat">
                    Public Chat
                </Link>
            </button>
            <button className="button" name="button">
                <Link className="link" to="/private-chat">
                    Private Chat
                </Link>
            </button>
            <button className="button" name="button">
                <a className="link" href="/logout">
                    Logout
                </a>
            </button>
        </div>
    );
}
