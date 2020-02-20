import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default function Videos() {
    // const onlineUsers = useSelector(state => state && state.onlineUsers);
    // console.log("onlineUsers: ", onlineUsers);

    return (
        <div className="component speech-bubble">
            <div className="heading-and-x">
                <h1>Welcome to the intergenerational support page</h1>
                <Link to="/home">
                    <h1 className="x">x</h1>
                </Link>
            </div>
            <div className="video-container">
                <div className="single-video-container">
                    <h3>How to start a TeamViewer Session</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
                <div className="single-video-container">
                    <h3>Sharpen your vision: Find the X</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
                <div className="single-video-container">
                    <h3>How to install an adblocker</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
                <div className="single-video-container">
                    <h3>How to find the menu</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
                <div className="single-video-container">
                    <h3>How to attach a file to an e-mail - gmail</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
                <div className="single-video-container">
                    <h3>How to attach afile to en email - aol</h3>
                    <video
                        controls
                        src="/Testvideo-forboomers.mp4"
                        allowFullScreen
                        width={450}
                        height={315}
                        frameBorder={0}
                    />
                </div>
            </div>
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
