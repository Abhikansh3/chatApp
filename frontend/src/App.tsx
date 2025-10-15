
import { useEffect, useRef, useState } from 'react'
import './App.css'


function App() {

  const [messages , setMessages] = useState<string[]>(['hi there']);
  const wsRef = useRef();
  useEffect(()=>{
      const ws = new WebSocket('http://localhost:8080');
      ws.onmessage = (event) => {
        setMessages(m => [...m, event.data])
       }
      wsRef.current = ws;

      ws.onopen = () =>{
        ws.send(JSON.stringify({
          type:"join",
          payload:{
            roomId:"red"
          }
        }))
      }
      return ()=>{
        ws.close()
      }
  },[])


  return (
    <>
      <div className='h-screen bg-black'>
        <div className='h-[90vh]'>
          {messages.map(message => <div className='p-5'>
            <span className='bg-white rounded p-4'>
              {message} 
              </span> 
              </div>)}
        </div>
        <div className='w-full bg-white flex rounded-lg'>
          <input id='message' type="text" className='flex-1 p-4'/>
          <button onClick={()=>{
            const message = document.getElementById('message').value;
            wsRef.current.send(JSON.stringify({

              type:"chat",
              payload:{
                message:message
              }
            }))
          }} className='bg-purple-600 text-white p-4 rounded-r-lg '>send message</button>
        </div>
      </div>
    </>
  )
}

export default App
