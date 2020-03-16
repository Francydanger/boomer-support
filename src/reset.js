import React from "react";
import axios from "./axios";
import { HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = { step: "start", error: false, email: null, code: null };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        //or just axios.post("/register", this.state)
        axios
            .post("/reset/start", {
                email: this.state.email
            })
            .then(({ data }) => {
                console.log("Data from axios post reset/start: ", data);
                if (data.success) {
                    console.log("data success");
                    this.setState({ step: "verify" });
                } else {
                    console.log("data fail in axios pos reset/start");
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log("Error in catch axios post reset/start: ", error);
                this.setState({
                    error: true
                });
            });
    }
    submitsecretCode() {
        axios
            .post("/reset/verify", {
                email: this.state.email,
                code: this.state.resetcode,
                newpassword: this.state.newpassword
            })
            .then(({ data }) => {
                console.log("Data from axios post reset/VERIFY: ", data);
                if (data.success) {
                    console.log("data success");
                    this.setState({ step: "successchange" });
                } else {
                    console.log("data fail in axios pos reset/VERIFY");
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(error => {
                console.log("Error in catch axios post reset/VERIFY: ", error);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Oops, there has been an error, please make sure to fill
                        out all fields
                    </div>
                )}

                {this.state.step == "start" && (
                    <div>
                        <div className="container">
                            <input
                                className="input"
                                placeholder="E-Mail-Address"
                                name="email"
                                onChange={e => this.handleChange(e)}
                            />
                            <button
                                className="button"
                                onClick={() => this.submit()}
                            >
                                Get Reset Code
                            </button>
                        </div>
                    </div>
                )}

                {this.state.step == "verify" && (
                    <div>
                        <div className="container">
                            <input
                                className="input"
                                placeholder="Reset-Code"
                                name="resetcode"
                                onChange={e => this.handleChange(e)}
                            />
                            <input
                                className="input"
                                placeholder="New Password"
                                name="newpassword"
                                type="password"
                                onChange={e => this.handleChange(e)}
                            />
                            <button
                                className="button"
                                onClick={() => this.submitsecretCode()}
                            >
                                Submit resetcode and new password
                            </button>
                        </div>
                    </div>
                )}

                {this.state.step == "successchange" && (
                    <div>
                        <div>Your password has been successfully changed</div>
                        <HashRouter>
                            <Link to="/login">Login</Link>
                        </HashRouter>
                    </div>
                )}
            </div>
        );
    }
}
