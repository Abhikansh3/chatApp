//chat app
// import { WebSocketServer , WebSocket} from "ws";
// const wss = new WebSocketServer({port:8080});

// let userCount = 0;
// let allSockets:WebSocket[] = []

// wss.on('connection', (socket)=>{
//     allSockets.push(socket)
//     console.log('user connect')
//     userCount++
//     console.log('userConnect#'+userCount);

//     socket.on('message', (message) => { 
//         console.log( "message recieved" , message.toString());
//         // setTimeout(()=>{
//         // socket.send(message.toString() + ":sent from server")
//         // },1000)
//         allSockets.forEach(s=>{
//             s.send(message.toString()+": sent from server");
//         })
//     })

//     socket.on('disconnect',()=>{
//         allSockets = allSockets.filter(x => x != socket)
//     })
// })

//room logic
import { WebSocketServer , WebSocket} from "ws";
const wss = new WebSocketServer({port:8080});
interface User {
    socket:WebSocket;
    room:string;
}
let allSockets:User[] = []

wss.on('connection', (socket)=>{
    console.log('user connect')

    socket.on('message', (message) => { 
     const parsedMessage = JSON.parse(message as any as string);
     if(parsedMessage.type === 'join'){
        allSockets.push({
            socket,
            room:parsedMessage.payload.roomId
        })
     }
     if(parsedMessage.type === 'chat'){
        // const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room
        let currentUserRoom = null;
        for(let i = 0; i<allSockets.length;i++){
            if(allSockets[i]?.socket == socket){
              currentUserRoom =   allSockets[i]?.room 
            }
        }
        for(let i =0;i<allSockets.length;i++){
            if(allSockets[i]?.room == currentUserRoom){
                allSockets[i]?.socket.send(parsedMessage.payload.message)
            }
        }
        
     }
    })
})

