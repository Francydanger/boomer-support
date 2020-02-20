import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default function Home() {
    // const onlineUsers = useSelector(state => state && state.onlineUsers);
    // console.log("onlineUsers: ", onlineUsers);

    return (
        <div className="component speech-bubble">
            <h1>Welcome to the intergenerational support page</h1>
            <h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>

            {/* {onlineUsers &&
                onlineUsers.map(user => {
                    return (
                        <li key={user.id}>
                            <Link className="link" to="/chats">
                                <div className="footer-users">
                                    <p>{`${user.first} ${user.last}`}</p>
                                    <img
                                        className="profilepic-footer"
                                        src={user.profilepic}
                                    />
                                </div>
                            </Link>
                        </li>
                    );
                })} */}
        </div>
    );
}
