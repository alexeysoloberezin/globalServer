// function websocketStartSave() {
//     const ws = require('ws')
//     const { v4: uuidv4 } = require('uuid');
//
//     const wss = new ws.Server({
//         port: process.env.PORTWebSocket
//     }, () => { console.log(`Server WS start ws : ${process.env.PORTWebSocket}`) })
//
//
//     wss.on('connection', function connection(ws) {
//         let uuid = uuidv4()
//
//         ws.on('message', function (message) {
//             message = JSON.parse(message)
//
//             console.log('message', message)
//
//             switch (message.event) {
//                 case 'join':
//
//                 case 'leave':
//                     // leave(room);
//                     break;
//                 case 'message':
//                     broadCastMessage({message,  roomId: uuid})
//                     break;
//                 case 'connection':
//                     broadCastMessage({message, roomId: uuid})
//                     break;
//             }
//         })
//     })
//
//     function broadCastMessage({ message, roomId, room, uuid }){
//         wss.clients.forEach(client => {
//             if (client !== ws && client.readyState === ws.OPEN){
//                 if (message.event === 'connection'){
//                     client.send(JSON.stringify({...message, roomId}))
//                 }
//
//                 console.log('message.event',message.event)
//                 console.log('message.roomId',message.roomId)
//                 console.log('roomId',roomId)
//
//                 if (message.event === 'message' && message.roomId === roomId){
//                     client.send(JSON.stringify({...message}))
//                 }
//             }
//         })
//     }
// }
//
// module.exports = websocketStart
