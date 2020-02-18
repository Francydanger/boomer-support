import * as io from "socket.io-client";
import {
    addChatMessage,
    getChatMessages,
    showDataOfOnlineUsers,
    showLoggedInUser
} from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        /// i dont understand this if ststement anymore, why is that?
        socket = io.connect();

        //Test-socket from class
        // socket.on("muffin", msg => console.log("can everyone see this?", msg));

        socket.on("get 10 Messages from back to front", msgs =>
            store.dispatch(getChatMessages(msgs))
        );
        //
        socket.on("get one Message from back to front", msg =>
            store.dispatch(addChatMessage(msg))
        );

        socket.on("Online Users", userData =>
            store.dispatch(showDataOfOnlineUsers(userData))
        );
        socket.on("LoggedInId", LoggedInId =>
            store.dispatch(showLoggedInUser(LoggedInId))
        );
    }
};