import React from "react";
import { HashRouter, Route } from "react-router-dom"; //this always adds a hash /#/ is "/"
import Login from "./login";
import Registration from "./registration";
import Reset from "./reset";

export default function Welcome() {
    console.log("hello from new welcome");

    return (
        <div>
            <HashRouter>
                <div>
                    <div className="center">
                        <h1>Final project here i come</h1>
                        <h2>
                            Welcome to the support page that will change you
                            life
                        </h2>

                        <img
                            className="small-image"
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
