import * as io from "socket.io-client";
import {
    addChatMessage,
    getChatMessages,
    showDataOfOnlineUsers,
    showLoggedInUser,
    showPrivateChat,
    addPrivateChatMessage
} from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("get 10 Messages from back to front", msgs =>
            store.dispatch(getChatMessages(msgs))
        );

        socket.on("get one Message from back to front", msg =>
            store.dispatch(addChatMessage(msg))
        );

        socket.on("Online Users", userData =>
            store.dispatch(showDataOfOnlineUsers(userData))
        );
        socket.on("LoggedInId", LoggedInId =>
            store.dispatch(showLoggedInUser(LoggedInId))
        );

        socket.on("add private message", data =>
            store.dispatch(addPrivateChatMessage(data))
        );

        socket.on("showPrivateChat", (data, messagehistory) =>
            store.dispatch(showPrivateChat(data, messagehistory))
        );
    }
};
