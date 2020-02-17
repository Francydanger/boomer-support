import React from "react";
import axios from "./axios";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        //this [e.target.name] = e.target.value; would also work - without the state
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        //or just axios.post("/register", this.state)
        console.log(this);
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("Data from axios post register: ", data);
                console.log(data);
                if (data[0].id) {
                    console.log("data success");
                    location.replace("/");
                } else {
                    console.log("data fail");
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log("Error in catch axios post register: ", error);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        return (
            <div>
                <div className="logo-container">
                    <img className="logo-big" src="guinea2.jpg"></img>
                </div>
                {this.state.error && (
                    <div className="error">
                        Oops, there has been an error, please make sure to fill
                        out all fields
                    </div>
                )}
                <div className="login-container">
                    <input
                        className="input-login"
                        placeholder="E-Mail-Address"
                        name="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="input-login"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={e => this.handleChange(e)}
                    />
                    <button className="button" onClick={() => this.submit()}>
                        Login
                    </button>
                    <HashRouter>
                        {/* put link thing here */}
                        <Link className="link" to="/">
                            Register
                        </Link>
                        <Link className="link" to="/reset/start">
                            Forgot Password?
                        </Link>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
