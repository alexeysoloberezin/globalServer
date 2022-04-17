const {userJoin, getRoomUsers, reverseRoomId, getCurrentUser, getIdFromRoom, getUsers, setUsers} = require("./helpers/chat/usersChat");

function websocketStart(server) {
    const { Server } = require("socket.io");
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        },
        allowEIO3: true
    });

    io.on('connection', (socket) => {

        socket.on('setChatUsers', ({chatUsers}) => {
            setUsers([])
            chatUsers.forEach(chatUser => {
                userJoin(chatUser.id, chatUser.name || chatUser.email, chatUser.room, socket.id)
            })
            socket.emit('setChatUsers', getUsers());
        })

        socket.on("joinRoom", ({ userName, userId, room }) => {
            const user = userJoin(userId, userName, room, socket.id);

            socket.join(user.room);

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
            io.to(reverseRoomId(user.room)).emit('roomUsers', {
                room: reverseRoomId(user.room),
                users: getRoomUsers(user.room)
            });
        });

        socket.on('message', (message) => {
            const user = getCurrentUser(message.userId);

            const friendId = getIdFromRoom(user.room, 'last')
            const friend = getCurrentUser(friendId)

            io.to(user.room).emit('message', message);
            io.to(reverseRoomId(user.room)).emit('message', message);

            io.to(friend.socketId).emit('notification', `you have new message, from ${user.name}`);
        });
    });

    server.listen(5555, () => {
        console.log('listening on *:5555');
    });

}

module.exports = websocketStart
