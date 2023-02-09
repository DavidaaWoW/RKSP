const express = require("express");
const http = require("http");


const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let total = 0;
let usernames = [];

function checkForUsername(username, id){
    let status = true;
    usernames.forEach((username_) => {
        if(username_.username == username){
            username_.id = id;
            status = false;
        }
    });
    return status;
}

function getUserByUsername(username){
    let user = '';
    usernames.forEach((username_) => {
        if(username_.username == username){
            user = username_;
        }
    });
    return user;
}

io.sockets.on("connection", (socket) => {

    const handshake = socket.handshake.query;
    console.log("Успешное соединение ", handshake.username);

    if (!handshake.username) {
        setTimeout(() => socket.disconnect(true),1);
    } else {
        total++;
        socket.username = handshake.username;
        if(checkForUsername(socket.username, socket.id)) {
            const newUser = {username: socket.username, id: socket.id};
            usernames.push(newUser);
            socket.broadcast.emit('newUser', newUser);
        }
    }

    socket.on('message', (data) => {
        socket.to(getUserByUsername(data.receiver).id).emit('newMessage', data.message);
    });

    socket.on('getUsers', (user) => {
        const newUsernames = [];
        usernames.forEach((username) => {
            if(username.username!=user.user){
                newUsernames.push(username);
            }
        });
       socket.emit('users', newUsernames);
    });


    socket.on('disconnect', ()=> {
        console.log('disconnect', socket.username);
        total--;
        socket.broadcast.emit('leaved', {name: socket.username, total});
    })
});


const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log("Server running on port "+PORT));