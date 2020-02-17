import React, { useState, useEffect } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile";
import Header from "./header";
import Footer from "./footer";
import FindPeople from "./findpeople";
import Friends from "./friends";
import { Chat } from "./chats";
import Home from "./home";
import { useSelector } from "react-redux";

export default function App() {
    useEffect(() => {
        console.log("component did mount");
        axios
            .get("/user.json")
            .then(({ data }) => {
                console.log("Data in componentndidmountmainwrapping: ", data);
                this.setState(data);
            })
            .catch(error => {
                console.log("Error in catch axios get user: ", error);
                this.setState({
                    error: true
                });
            });
    }, []);

    if (!this.state.id) {
        return "Loading"; //or progressbar.gif or something - this works because render runs again as soon as a state change happens!
    }
    return (
        <BrowserRouter>
            <Header
                first={this.state.first}
                last={this.state.last}
                imageUrl={this.state.imageUrl}
            />
            <div>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            clickHandler={() =>
                                this.setState({
                                    uploaderIsVisible: true
                                })
                            } //this is being called by an onclick in img in ProfilePic
                            imageUrl={this.state.imageUrl}
                            first={this.state.first}
                            last={this.state.last}
                            id={this.state.id}
                            test={
                                "Hi I am a property named test wihtin the profile compnent call in Mainwrapping compnent and i am passed to profile and then to bioeditor"
                            }
                            setBio={bio => this.setState({ bio: bio })}
                            bio={this.state.bio}
                        />
                    )}
                />

                <Route path="/user/:id" component={OtherProfile} />
                <Route path="/home" component={Home} />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImageUrl={imageUrl =>
                            this.setState({ imageUrl: imageUrl })
                        }
                        hideUploader={() =>
                            this.setState({ uploaderIsVisible: false })
                        }
                    />
                )}
                <Route
                    exact
                    path="/users"
                    render={() => (
                        <FindPeople
                            first={this.state.first}
                            last={this.state.last}
                            id={this.state.id}
                        />
                    )}
                />
                <Route path="/friends" component={Friends} />
                {/* <Route path="/chathooks" component={Chathooks} /> */}
                <Route path="/chats" component={Chat} />
                <Route path="*" component={Footer} />
            </div>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}
