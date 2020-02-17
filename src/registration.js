import React from "react";
import axios from "./axios"; //from now on always require the copy of axios from axios.js instead of from the module
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category: "boomer" };
    }
    handleChange(e) {
        //this [e.target.name] = e.target.value; would also work - without the state
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("this.state in handelchange", this.state);
    }
    submit() {
        //or just axios.post("/register", this.state)
        // console.log(this);

        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                category: this.state.category,
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
                    //i cannot get in here, whyyyy?
                    //failure
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
                <div>
                    <h2>Please register here</h2>
                    {/* <img className="logo-big" src="guinea2.jpg"></img> */}
                </div>

                {this.state.error && (
                    <div className="error">
                        Oops, there has been an error, please make sure to fill
                        out all fields
                    </div>
                )}
                <div className="register-container">
                    <input
                        className="input-register"
                        placeholder="First Name"
                        name="first"
                        onChange={e => this.handleChange(e)}
                    />

                    <input
                        className="input-register"
                        placeholder="Last Name"
                        name="last"
                        onChange={e => this.handleChange(e)}
                    />
                    <div>
                        <h3>Please choose your category</h3>
                        <select
                            onChange={e => this.handleChange(e)}
                            name="category"
                        >
                            <option value="boomer">Boomer</option>
                            <option value="millenial">Millenial</option>
                        </select>
                    </div>
                    <input
                        className="input-register"
                        placeholder="E-Mail-Address"
                        name="email"
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        className="input-register"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={e => this.handleChange(e)}
                    />
                    <button className="button" onClick={() => this.submit()}>
                        Register
                    </button>
                    <HashRouter>
                        {/* put link thing here */}
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
