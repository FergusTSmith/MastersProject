//import socketClient from 'socket.io-client';
//import { io } from "./socket.io-client";


/* Adding an initial connection to socket.io */
//var socketConnection = io.connect("http://127.0.0.1:3080");
const socket = io("http://138.68.132.17/");

//const socket = socketClient("http://localhost:3080");

socket.on('connect', function(){
    console.log("Client has been successfully connected to Socket.");
})

socket.emit('custom-event', 10, 'Hi');

//const socket = io();