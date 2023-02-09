import React, {useState, useEffect} from "react";
import {redirect, useNavigation} from "react-router-dom";
import { useSignIn } from 'react-auth-kit'
import axios, {AxiosError} from 'axios';


export default function LoginForm(){

    const signIn = useSignIn();
    const [usernameInput, setUsername] = useState('');
    const [passwordInput, setPassword] = useState('');
    const headers = { headers: {'Content-Type': 'application/json'}}

    const onSubmit = async () => {
        try {
            const jsonBody = {
                username: usernameInput,
                password: passwordInput
            };
            const response = await axios.post(
                "http://localhost:3002/login",
                jsonBody,
                headers
            );
            signIn({
                token: response.data.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { username: usernameInput, role: response.data.data.role },
            });
            window.location.replace("http://localhost:3000/chat");
        } catch (err) {
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);
        }
    };




    return(
        <div>
            <h1>Login</h1>
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" id="inputUsername" />
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="inputPassword"/>
            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
}