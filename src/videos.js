import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default function Videos() {
    // const onlineUsers = useSelector(state => state && state.onlineUsers);
    // console.log("onlineUsers: ", onlineUsers);
    const users = useSelector(state => state && state.users);
    return (
        <div className="component speech-bubble-videos">
            <div className="heading-and-x">
                <h1>Videos</h1>
                <Link to="/home">
                    <h1 className="x">x</h1>
                </Link>
            </div>

            {users.category === "millenial" && (
                <div className="upload-container">
                    <h2>Upload Video:</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input type="text" name="title" placeholder="Title" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Your Username"
                    />
                    <input type="file" name="file" accept="image/*" />
                    <button className="button">Submit</button>
                </div>
            )}

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
        </div>
    );
}
