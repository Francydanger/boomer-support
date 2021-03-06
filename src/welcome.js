import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import Registration from "./registration";
import Reset from "./reset";

export default function Welcome() {
    console.log("hello from new welcome");

    return (
        <div className="welcome-style">
            <HashRouter>
                <div>
                    <div className="center">
                        <br></br>
                        <br></br>

                        <h1>
                            Welcome to the support page that will change you
                            life
                        </h1>

                        <img
                            className="welcome-gif"
                            src="https://media.giphy.com/media/de5bARu0SsXiU/giphy.gif"
                        ></img>
                    </div>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                </div>
            </HashRouter>
        </div>
    );
}
