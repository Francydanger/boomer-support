import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { startPrivateChat } from "./actions";

export function PrivateChat() {
    const loggedInId = useSelector(state => state && state.loggedInId);
    console.log("loggedInId: ", loggedInId);
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("chatmessages: ", chatMessages);
    const onlineUsers = useSelector(state => state && state.onlineUsers);
    console.log("onlineUsers: ", onlineUsers);
    const users = useSelector(state => state && state.users);
    const privateChattee = useSelector(state => state && state.chattee_data);
    console.log(privateChattee);
    const privateChatIsVisible = useSelector(
        state => state.privateChatIsVisible
    );
    console.log("privateChatVisible", privateChatIsVisible);
    // const [privateChattee, setPrivateChattee] = useState("");

    const privateChatMessages = useSelector(
        state => state && state.privateChatMessages
    );
    console.log("privatechatmessages: ", privateChatMessages);

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
    }, [chatMessages, privateChattee]);

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
            socket.emit(
                "privateChatMessage",
                e.target.value,
                privateChattee.chatId
            );
            e.target.value = "";
        }
    };

    const handleClick = id => {
        // setPrivateChattee(id);
        // console.log("id: ", id);
        // console.log("privateChatteeid: ", privateChattee);
        // // var hello = "hi there";
        // // socket.emit("privateChatMessage", id);
        socket.emit("showPrivateChat", id);
    };

    return (
        <div className="private-chat-component speech-bubble" ref={elemRef}>
            <h1>Hello from private chat between user1 and user2</h1>
            <h2>Start private chat with:</h2>
            {onlineUsers &&
                onlineUsers.map(user => {
                    return (
                        <button
                            key={user.id}
                            onClick={() => handleClick(user.id)}
                        >
                            <div className="footer-users">
                                <p>{`${user.first} ${user.last}`}</p>
                            </div>
                        </button>
                    );
                })}

            {privateChatIsVisible && (
                <div className="private-chat-container">
                    <h2>
                        This is a private chat between you, {users.first}(id
                        {loggedInId}) and
                        {privateChattee && <p>{privateChattee.first}</p>}
                    </h2>
                    {privateChatMessages &&
                        privateChatMessages.map(msg => {
                            return (
                                <ul key={msg.id}>
                                    {msg.user_id === loggedInId ? (
                                        <div className="chat-message-container-loggedin">
                                            <p className="wrap">
                                                {msg.first}: {msg.message}
                                            </p>
                                        </div>
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

                    <h2>Write a message to (other chat user):</h2>
                    <div className="textarea-container">
                        <textarea
                            placeholder="Add your private message here and hit enter to submit it"
                            onKeyDown={keyCheck}
                            className="textarea"
                        ></textarea>
                    </div>

                    <h2>ckick this button to start the teamviewer session</h2>
                    <h1>
                        <a href="https://get.teamviewer.com/6xe5sd6">
                            hier starten
                        </a>
                    </h1>
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
                </div>
            )}
        </div>
    );
}
