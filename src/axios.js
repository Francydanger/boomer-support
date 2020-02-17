import axios from "axios";

var copy = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token"
});

export default copy; //cuz its a copy of axios including the csurf stff

//this is so we dont have to add the csurf token stuff to every axios.post request as a third argument
