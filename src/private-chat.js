import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PrivateChat() {
    const loggedInId = useSelector(state => state && state.loggedInId);
    console.log("loggedInId: ", loggedInId);
    const onlineUsers = useSelector(state => state && state.onlineUsers);
    console.log("onlineUsers: ", onlineUsers);
    const users = useSelector(state => state && state.users);
    const privateChattee = useSelector(state => state && state.chattee_data);
    console.log(privateChattee);
    const privateChatIsVisible = useSelector(
        state => state.privateChatIsVisible
    );
    console.log("privateChatVisible", privateChatIsVisible);

    const privateChatMessages = useSelector(
        state => state && state.privateChatMessages
    );
    console.log("privatechatmessages: ", privateChatMessages);

    const elemRef = useRef();
    console.log("elemRef:", elemRef);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [privateChattee]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("after enter what user has typed: ", e.target.value);
            socket.emit(
                "privateChatMessage",
                e.target.value,
                privateChattee.chatId
            );
            e.target.value = "";
        }
    };

    const handleClick = id => {
        socket.emit("showPrivateChat", id);
    };

    return (
        <div className="component speech-bubble-private" ref={elemRef}>
            <div className="heading-and-x">
                <h1>Private Chat</h1>
                <Link to="/home">
                    <h1 className="x">x</h1>
                </Link>
            </div>
            <br></br>
            <h2>Start private chat with:</h2>
            <div className="online-users-buttons-container">
                {onlineUsers &&
                    onlineUsers.map(user => {
                        return (
                            <div key={user.id}>
                                {user.id !== loggedInId && (
                                    <button
                                        className="online-button"
                                        onClick={() => handleClick(user.id)}
                                    >
                                        <div className="footer-users">
                                            <p>{`${user.first} ${user.last}`}</p>
                                        </div>
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>

            {privateChatIsVisible && (
                <div>
                    <div className="private-chat-container chat-container">
                        {/* <h2>
                            This is a private chat between you, {users.first}(id
                            {loggedInId}) and{" "}
                            {privateChattee && <p>{privateChattee.first}</p>}
                        </h2> make his work somehow!!!*/}
                        {privateChatMessages &&
                            privateChatMessages.map((msg, index) => {
                                return (
                                    <div key={index}>
                                        {msg.user_id === loggedInId ? (
                                            <div className="chat-container-right">
                                                <div className="chat-bubble-right">
                                                    <p>{msg.message}</p>
                                                </div>
                                                <p className="messenger-name-right">
                                                    {msg.first}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="chat-container-left">
                                                <p className="messenger-name-left">
                                                    {msg.first}
                                                </p>
                                                <div className="chat-bubble-left">
                                                    <p>{msg.message}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                    <div className="join-conv">
                        <h2>Write a message:</h2>
                        <div className="textarea-container">
                            <textarea
                                placeholder="Add your private message here and hit enter to submit it"
                                onKeyDown={keyCheck}
                                className="textarea"
                            ></textarea>
                        </div>
                    </div>
                    {users.category === "millenial" && (
                        <div className="teamviewer-session-millenial center">
                            <h2>
                                Please download Teamviewer here to give support
                                to this desperate boomer:
                            </h2>

                            <div
                                style={{
                                    position: "relative",
                                    width: "234px",
                                    height: "60px"
                                }}
                            >
                                <a
                                    href="https://www.teamviewer.com/link/?url=842558&id=186112185"
                                    style={{ textDecoration: "none" }}
                                >
                                    <img
                                        src="https://www.teamviewer.com/link/?url=945136&id=186112185"
                                        alt="Download TeamViewer Vollversion"
                                        title="Download TeamViewer Vollversion"
                                        width={234}
                                        height={60}
                                        border={0}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "22px",
                                            left: "55px",
                                            display: "block",
                                            cursor: "pointer",
                                            color: "White",
                                            fontFamily: "Arial",
                                            fontSize: "13px",
                                            lineHeight: "1.2em",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            width: "174px"
                                        }}
                                    >
                                        TeamViewer herunterladen
                                    </span>
                                </a>
                            </div>
                        </div>
                    )}
                    {users.category === "boomer" && (
                        <div className="teamviewer-session-boomer center">
                            <h2>
                                Please click this button to start the TeamViewer
                                Session
                            </h2>
                            <div
                                style={{
                                    position: "relative",
                                    width: "200px",
                                    height: "125px"
                                }}
                            >
                                <a
                                    href="https://www.teamviewer.com/link/?url=505374&id=186112185"
                                    style={{ textDecoration: "none" }}
                                >
                                    <img
                                        src="https://www.teamviewer.com/link/?url=246800&id=186112185"
                                        alt="Remote Support mit TeamViewer"
                                        title="Remote Support mit TeamViewer"
                                        width={200}
                                        height={125}
                                        border={0}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "74.5px",
                                            left: "5px",
                                            display: "block",
                                            cursor: "pointer",
                                            color: "White",
                                            fontFamily: "Arial",
                                            fontSize: "15px",
                                            lineHeight: "1.2em",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            width: "190px"
                                        }}
                                    >
                                        Fernzugriff
                                        <br />
                                        mit TeamViewer
                                    </span>
                                </a>
                            </div>
                            <button className="button">
                                <Link className="link" to="/videos">
                                    How to do this
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
