import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {io} from "socket.io-client";

export function DialogItem() {
    let {state} = useLocation();
    const self = state.self;
    const socket = io.connect("http://localhost:3001", {query: {username: self}});

    const [messages, setMessages] = useState([]);
    const [nameInput, changeNameInput] = useState('');

    function sendMessage(){
        socket.emit('message', {message: nameInput, receiver: state.username});
    }

    function addMessage(message){
        const newMessages = [...messages];
        newMessages.push({message: message, key: Date.now().toString(36) + Math.random().toString(36).substr(2)});
        setMessages(newMessages);
    }

    useEffect(() => {
        if(socket) {
            socket.on('newMessage', (message) => addMessage(message));
        }
    }, [socket]);

    return (
        <div>
        <div>
            {messages.map((message, index) => (
                <p key={message.key}>{message.message}</p>
            ))}
        </div>
            <div>
                <input type="text" onChange={(event) => {changeNameInput(event.target.value)}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}