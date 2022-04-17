let users = [];

// Join user to chat
function userJoin(id, username, room, socketId) {
    const user = { id, name: username, room, socketId };
    users.push(user);
    return user;
}

// Get users
function getUsers() {
    return users
}

// Set users
function setUsers(list) {
    users = JSON.parse(JSON.stringify(list))
    return users
}

// Get current user
function getCurrentUser(filter, type = 'id') {
    if (type === 'id') return users.find(user => +user.id === +filter);
    if (type === 'name') return users.find(user => user.name === filter);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

// reverse room id
function reverseRoomId(room) {
    return room.split('-').reverse().join('-')
}

// reverse room id
function getIdFromRoom(room, type) {
    if (!room) return ''
    if (type === 'last') return room.split('-')[1]
    return room.split('-')[0]
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getIdFromRoom,
    setUsers,
    getRoomUsers,
    getUsers,
    reverseRoomId
};
