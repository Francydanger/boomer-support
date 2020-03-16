import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Videos() {
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
                    <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Title"
                    />
                    <input
                        className="input"
                        type="text"
                        name="username"
                        placeholder="Your Username"
                    />
                    <input
                        className="input"
                        type="file"
                        name="file"
                        accept="image/*"
                    />
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
                    <h3>How to attach a file to en email - gmx</h3>
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
