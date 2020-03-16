import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import Videos from "./videos";
import { Chat } from "./chat";
import { PrivateChat } from "./private-chat";
import Home from "./home";
import { useDispatch, useSelector } from "react-redux";
import { putUserInfoInRedux } from "./actions";

export default function App() {
    const dispatch = useDispatch();
    const users = useSelector(state => state && state.users);
    console.log("users from global state: ", users);
    useEffect(() => {
        dispatch(putUserInfoInRedux());
    }, []);

    if (!users) {
        return "Loading";
    }

    if (users && users.category == "millenial") {
        document.body.classList.add("millenial");
        return (
            <BrowserRouter>
                <Header />
                <Route path="/home" component={Home} />
                <Route path="/videos" component={Videos} />

                <Route exact path="/chat" render={() => <Chat />} />
                <Route
                    exact
                    path="/private-chat"
                    render={() => <PrivateChat />}
                />
            </BrowserRouter>
        );
    } else if (users && users.category == "boomer") {
        document.body.classList.add("boomer");
        return (
            <BrowserRouter>
                <Header />
                <Route path="/home" component={Home} />
                <Route path="/videos" component={Videos} />
                <Route exact path="/chat" render={() => <Chat />} />
                <Route
                    exact
                    path="/private-chat"
                    render={() => <PrivateChat />}
                />
            </BrowserRouter>
        );
    } else
        return (
            <h1>
                Sorry, an error has occured, please wait another 5 seconds and
                if still nothing happens there is a problem on my side, so do
                not worry, you did not do anything wrong
            </h1>
        );
}
