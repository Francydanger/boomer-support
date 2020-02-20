import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default function Home() {
    // const onlineUsers = useSelector(state => state && state.onlineUsers);
    // console.log("onlineUsers: ", onlineUsers);

    return (
        <div className="component">
            <h1>Welcome to the Boomer support Page</h1>

            <video
                controls
                src="/Testvideo-forboomers.mp4"
                allowFullScreen
                width={560}
                height={315}
                frameBorder={0}
            />
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
