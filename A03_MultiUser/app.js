const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

// variables to keep track of score and which cup is chosen
var cupNum2D = 0;
var cupNum3D = 0;

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/2D.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/3D.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    
//reads in input from server, outputs new data to server 

// 2D - html stuff 
    socket.on("cup1", (data) => {
        console.log( "cup 1 chosen" );
        io.sockets.emit("cup1");
        cupNum2D = 1;
    });

    socket.on("cup2", (data) => {
        console.log( "cup 2 chosen" );
        io.sockets.emit("cup2");
        cupNum2D = 2;
    });

    socket.on("cup3", (data) => {
        console.log( "cup 3 chosen" );
        io.sockets.emit("cup3");
        cupNum2D = 3;
    });

    // 3D - html stuff 

    socket.on("cup11", (data) => {
        console.log( "cup 1 chosen" );
        io.sockets.emit("cup11");
        cupNum3D = 1;
        myFunction();
    });

    socket.on("cup22", (data) => {
        console.log( "cup 2 chosen" );
        io.sockets.emit("cup22");
        cupNum3D = 2;
        myFunction();
    });

    socket.on("cup33", (data) => {
        console.log( "cup 3 chosen" );
        io.sockets.emit("cup33");
        cupNum3D = 3;
        myFunction();
    });

    // game reset button 
    socket.on("resetGame", (data) => {
        console.log( "reset game selected" );
        io.sockets.emit("resetGame");
    });


    
// score function 
    function myFunction() {
        if (cupNum2D == cupNum3D){
        console.log("winner");
       io.sockets.emit('winner');
    }};
});