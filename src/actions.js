import axios from "./axios";

export async function putUserInfoInRedux() {
    const { data } = await axios.get("/user.json");
    console.log("Data from axios putUserInfoInRedux", data);
    return {
        type: "PUT_USER_IN_REDUX",
        users: data
    };
}

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("Data from axios receive friendswannabes", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendswannabes: data
    };
}

export async function acceptFriendRequest(id) {
    console.log("hello from acceptfreidnrequest");
    console.log("id in accept friedn request", id);
    await axios.post("/accept-friend-request/" + id);
    console.log("after axios");
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id
    };
}

export async function endFriendship(id) {
    await axios.post("/end-friendship/" + id);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export async function getChatMessages(messages) {
    console.log("messages in get chatmessages actions:", messages);
    return {
        type: "GET_CHAT_MESSAGES",
        chatMessages: messages
    };
}

export async function addChatMessage(message) {
    console.log("message in addchatmessage actions:", message);
    return {
        type: "ADD_CHAT_MESSAGE",
        chatMessage: message
    };
}

export async function addPrivateChatMessage(message) {
    console.log("message in addPRIVATEchatmessage actions:", message);
    return {
        type: "ADD_PRIVATE_CHAT_MESSAGE",
        privateChatMessage: message
    };
}

export async function showDataOfOnlineUsers(userdata) {
    console.log("message in addchatmessage actions:", userdata);
    return {
        type: "GET_ONLINE_USERS",
        onlineUsers: userdata
    };
}

export async function showLoggedInUser(loggedInId) {
    console.log("message in addchatmessage actions:", loggedInId);
    return {
        type: "SHOW_LOG_ID",
        loggedInId: loggedInId
    };
}

export async function showPrivateChat(chattee_data, messagehistory) {
    return {
        type: "SHOW_PRIVATE_CHAT",
        chattee_data: chattee_data,
        privateChatMessages: messagehistory
    };
}
