export default function reducer(
    state = { privateChatIsVisible: false },
    action
) {
    if (action.type === "PUT_USER_IN_REDUX") {
        state = {
            ...state,
            users: action.users
        };
        console.log("state from reducer pt user in redux: ", state);
    }

    if (action.type === "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendswannabes: action.friendswannabes
        };
        console.log("state from reducer: ", state);
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        console.log("ACCEPT_FRIEND", action);
        state = {
            ...state,
            friendswannabes: state.friendswannabes.map(person => {
                if (person.id != action.id) {
                    return person;
                } else {
                    return {
                        ...person,
                        accepted: true
                    };
                }
            })
        };
    }

    if (action.type === "END_FRIENDSHIP") {
        console.log("END_FRIENDSHIP", action);
        state = {
            ...state,
            friendswannabes: state.friendswannabes.filter(person => {
                if (person.id != action.id) {
                    return person;
                } else {
                    return person.id !== action.id;
                }
            })
        };
    }
    // if (action.type === "GET_PRIVATE_CHAT_MESSAGES") {
    //     console.log("GET_PRIVATE_CHAT_MESSAGES", action);
    //     state = {
    //         ...state,
    //         privateChatMessages: action.privateChatMessages
    //     };
    // }

    if (action.type === "ADD_PRIVATE_CHAT_MESSAGE") {
        console.log("ADD_PRIVATE_CHAT_MESSAGE", action);
        state = {
            ...state,
            privateChatMessages: [
                ...state.privateChatMessages,
                action.privateChatMessage[0]
            ]
        };
    }
    if (action.type === "ADD_CHAT_MESSAGE") {
        console.log("ADD_CHAT_MESSAGE", action);
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage[0]]
        };
    }

    if (action.type == "SHOW_PRIVATE_CHAT") {
        return {
            ...state,
            chattee_data: action.chattee_data,
            privateChatIsVisible: true,
            privateChatMessages: action.privateChatMessages
        };
    }

    if (action.type === "GET_CHAT_MESSAGES") {
        console.log("GET_CHAT_MESSAGES", action);
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type === "GET_ONLINE_USERS") {
        console.log("GET_ONLINE_USERS", action);
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type === "SHOW_LOG_ID") {
        console.log("SHOW_LOG_ID", action);
        state = {
            ...state,
            loggedInId: action.loggedInId
        };
    }

    //
    return state;
}
