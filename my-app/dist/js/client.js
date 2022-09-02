//import socketClient from 'socket.io-client';
//import { io } from "./socket.io-client";

/*
* In this file, the client just connects the program to the socket of the server.js file. This allows for communication between the client and server.
*/


/* Adding an initial connection to socket.io */
const socket = io("http://44.203.94.188:3080");
socket.on('connect', function(){
    console.log("Client has been successfully connected to Socket.");
})

