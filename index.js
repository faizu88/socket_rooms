var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.join(socket.handshake.query.room);

    socket.on('channel_1', function (rData) {
        socket.emit('channel_2', {
            'socketId': socket.id,
            'rooms': io.sockets.adapter.rooms,
            'active': socket.handshake.query.room
        });
        //socket.broadcast.emit('msg',  {'socketId': socket.id});
        //io.emit('msg',{'socketId':socket.id});
    });


    socket.on('room_1_emit', function (rData) {
        io.sockets.in('Room_1').emit('room_1_listen', 'Room_1 Emitted');
    });

    socket.on('room_2_emit', function (rData) {
        io.sockets.in('Room_2').emit('room_2_listen', 'Room_2 Emitted');
    });

    socket.on('room_3_emit', function (rData) {
        io.sockets.in('Room_3').emit('room_3_listen', 'Room_3 Emitted');
    });

    socket.on('room_all_emit', function (rData) {
        io.sockets.in('Room_1').in('Room_2').in('Room_3').emit('room_all_listen', 'Room_1, Room_2, Room_3 Emitted');
    });


});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

