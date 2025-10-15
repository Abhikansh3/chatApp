import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
wss.on('connection', (socket) => {
    console.log('user connect');
    userCount++;
    console.log('userConnect#' + userCount);
    socket.on('message', (message) => {
        console.log("message recieved", message.toString());
        setTimeout(() => {
            socket.send(message.toString() + ":sent from server");
        }, 1000);
    });
});
//# sourceMappingURL=index.js.map