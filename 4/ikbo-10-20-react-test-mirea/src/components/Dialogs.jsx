import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Link} from "react-router-dom";



export default function Dialogs() {
    const [socket, setSocket] = useState(null);
    const [hideNameInput, hideNameInputF] = useState(false);
    const [nameInput, changeNameInput] = useState('');
    const [users, fillUsers] = useState([]);

    const addUser = (user) => {
        const arr = users;
        arr.push(user);
        fillUsers(arr);
    }

    useEffect(() => {
        if(socket){
            socket.on('newUser', (user) => addUser(user));
            socket.on('users', (users) => fillUsers(users));
            getUsers();
        }
    }, [socket]);

    useEffect(() => {
        console.log(users);
    }, [users]);


    function getUsers(){
        if(socket){
            socket.emit('getUsers', {user: nameInput});
        }
    }

    function submitName(){
        hideNameInputF(true);
        const socket_ = io.connect("http://localhost:3001", {query: {username: nameInput}});
        setSocket(socket_);
    }

    function disconnect(){
        socket.disconnect();
    }

    return (
        <div>
            <div id="name" style={{display: hideNameInput ? "none" : "block"}}>
                <p>enter your name</p>
                <input type="text" onChange={(event) => {changeNameInput(event.target.value)}}/>
                <button onClick={submitName}>submit</button>
            </div>
            <br/>
            {users.map((user) => (
                <Link to={"/dialogItem/"+user.username} onClick={disconnect} state={{username: user.username, id: user.id, self: nameInput}} >{user.username}</Link>
            ))}
        </div>
    );
}