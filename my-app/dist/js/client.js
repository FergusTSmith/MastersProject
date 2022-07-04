

/* Adding an initial connection to socket.io */
var socketConnection = io.connect("http://localhost:3090");
socketConnection.on('connect', function(){
    console.log("Client has been successfully connected to Socket.");
})