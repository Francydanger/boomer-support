import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Chat() {
    const loggedInId = useSelector(state => state && state.loggedInId);
    console.log("loggedInId: ", loggedInId);
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("chatmessages: ", chatMessages);

    const elemRef = useRef();
    console.log("elemRef:", elemRef);
    useEffect(() => {
        // console.log("chat mounted!!!!!");
        // console.log("elemRef:", elemRef);
        // let { clientHeight, scrollTop, scrollHeight } = elemRef.current;
        // console.log("scrolltop: ", scrollTop);
        // console.log("scrolltop: ", elemRef.current.scrollTop);
        // console.log("clientheight: ", elemRef.current.clientHeight);
        // console.log("scrollheight:", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight; // seems perfect for destructuring.
    }, [chatMessages]);

    //tipps: two things we want to emt from server: last 10 chat messages, and when user tpes something , send the text (we know id of user who send message, so with new query we can show who is the sender - late rsend it to frot end, to socket -actions just gives t reducer . reducer does different things depending on soe things)

    const keyCheck = e => {
        // console.log("what the user is typing: ", e.target.value);
        // console.log("which ky user pressed:", e.keyCode);
        // console.log("which ky user pressed:", e.key);
        if (e.key === "Enter") {
            e.preventDefault(); //stops the annoying moving to a new line even after text has been set to empty string.
            console.log("after enter what user has typed: ", e.target.value);
            //test-emit from class
            // socket.emit("my amazing chat message: ", e.target.value);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat-component">
            <h1> Chatroom</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => {
                        return (
                            <ul key={msg.id}>
                                {msg.user_id === loggedInId ? (
                                    <Link
                                        className="link"
                                        to={`/user/${msg.user_id}`}
                                    >
                                        <div className="chat-message-container-loggedin">
                                            <p className="wrap">
                                                {msg.first}: {msg.message}
                                            </p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="chat-message-container">
                                        <p className="wrap">
                                            {msg.first}: {msg.message}
                                        </p>
                                    </div>
                                )}
                            </ul>
                        );
                    })}
            </div>
            <h2>Integrate yourself into the conversation:</h2>
            <div className="textarea-container">
                <textarea
                    placeholder="Add your message here and hit enter to submit it"
                    onKeyDown={keyCheck}
                    className="textarea"
                ></textarea>
            </div>
        </div>
    );
}
