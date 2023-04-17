import '../ChatApp/Chat.css'
import { useNavigate } from "react-router-dom"
import Friend from "./Friend"
import Avater1 from '../../asserts/ava3-bg.webp'
import Avater2 from '../../asserts/ava3-bg (1).webp'
import RecievedMsg from "./RecievedMsg"
import SentMsg from "./SentMsg"
import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { useRef } from 'react'
import SendMessage from "./SendMessage/SendMessage"
import { Session } from '../../component/Session/Session'
import Searchbar from './Searchbar/Searchbar'
import { ChatHeader } from './ChatHeader/ChatHeader'
// import bg from '../../asserts/clo.png'


const ChatApp = () => {
    const socket = io.connect('http://localhost:5000', {
        transports: ["websocket"]
    });

    const menuRef = useRef()
    const scrollToBottomRef = useRef()


    const navigation = useNavigate()
    const[user, setUser] = useState()
    const[message, setMessage] = useState('')
    const[previousMessages, setPreviousMessages] = useState('')
    const[messageCategory, setmessageCategory] = useState('')

    const[messageId, setMessageId] = useState('')


    const chatFunction = () => {
        return{
            sortedMessage(){ //Sort chat function
                if(previousMessages){
                    const messages = previousMessages.filter(msg => msg.role ===  messageCategory)
                    return messages
                }
            },
            LoadMessages(){ //Load message function
                socket.emit('recieve message')
                socket.on('recieve message', (messages) => {
                    return setPreviousMessages(messages)
                })
            },
            sendMessage(){// Send messege function
                const messageObject = {
                    body: message,
                    yourID: Session() ? Session().id : "",
                    yourName: Session() ? Session().username : "",
                    role: messageCategory,
                }
                if(message){
                    socket.emit("send message", messageObject)
                    chatFunction().LoadMessages()
                    setMessage('')
                    document.querySelector('.message').value = ""
                    // scrollToBottomRef.current?.scrollIntoView({behavior: 'smooth'})
                }
            },
            deleteChat(){
                socket.emit("delete message", messageId)
                setMessageId('')
                chatFunction().LoadMessages()
            }
        }
    }

    const mobileMenu = () => {
        if(menuRef.current.classList.contains('d-none')){
            menuRef.current.classList.remove('d-none')
        }else{menuRef.current.classList.add('d-none')}
    }
    
   
    useEffect(() => {
        if(!Session() !== false) return navigation('/chat/authenticate');
        const activeUser = Session(); setUser(activeUser); setmessageCategory(activeUser.role);
        chatFunction().LoadMessages()
    }, [])


  return (
    <>
        {/* <img src={bg} alt="" /> */}
    <section style={{width: '100%', height: '100vh', overflow: 'hidden', background: '#202020'}} onClick={() => setMessageId('')}>
        <div className="container-fluid py-0 ">
            <div className="row ">
                <div className="col-md-12">
                    <div className="card1" id="chat3" style={{borderRadius: '15px'}}>
                        <div className="card-body p-0 ">
                            <div className="row py-2">
                                {/* Side menu  */}
                                <div className="col-md-4 d-lg-block d-xl-block d-xlg-block d-none" ref={menuRef}>
                                    <Searchbar />
                                    <div data-mdb-perfect-scrollbar="true" className="shadow h-100" style={{background: '#'}}>
                                        <ul className="list-unstyled mb-0 px-lg-4 px-3">
                                            <Friend 
                                                classname={"py-2"}
                                                userImage={Avater2} name="General group" 
                                                message="Hello, Are you there?" time="Just now" numberOfMessages='3' 
                                                onclick={() => setmessageCategory('general group')}
                                            />
                                            <Friend 
                                                classname={user && user.role !== 'student' ? "d-none" : "py-2"}
                                                userImage={Avater2} name="Student group" message="Hello, ?" 
                                                time="Just now" numberOfMessages='3' 
                                                onclick={() => setmessageCategory('student')}
                                            />
                                            <Friend 
                                                classname={user && user.role !== 'lecturer' ? "d-none" : "py-2"}
                                                userImage={Avater2} name="Lecurer's group" 
                                                message="Hello, group?" time="Just now" numberOfMessages='3' 
                                                onclick={() => setmessageCategory('lecturer')}
                                            />
                                        </ul>
                                    </div>
                                </div>
                                {/* Chats  */}
                                <div className="col-md-8 px-0">
                                    <section id="chat-container">
                                        <ChatHeader Id={messageId} onclick={chatFunction().deleteChat} func={mobileMenu}/>
                                        <section className='py-5 px-2'>
                                            {chatFunction().sortedMessage() ? chatFunction().sortedMessage().map((msg, index) => (
                                                Number(msg.sender_id) === Number(user.id)
                                                ?
                                                <div className="d-flex flex-row justify-content-end mb-3 col-md-12" key={index}>
                                                    <SentMsg 
                                                        userImg={Avater1}
                                                        message={String(msg.sender_id) === String(user.id) && msg.message}
                                                        username={String(msg.sender_id) === String(user.id) && msg.sender_name}
                                                        time={'12:00 PM | Aug 13'}
                                                        ondbclick={() => setMessageId(msg.id)}
                                                    />
                                                </div> 
                                                :
                                                <div className="pt-3 pe-3 mb-3 col-md-9" data-mdb-perfect-scrollbar="true" key={index}>
                                                    <RecievedMsg 
                                                        userImg={Avater2} 
                                                        username={String(msg.sender_id) !== String(user.id) && msg.sender_name} 
                                                        message={String(msg.sender_id) !== String(user.id) && msg.message} 
                                                        time={'12:00 PM | Aug 13'}
                                                        ondbclick={() => setMessageId(msg.id)}
                                                    />
                                                </div>
                                            ))
                                            : null}
                                                <SendMessage //Send message function
                                                    onchange={(e) => setMessage(e.target.value)}
                                                    onclick={(e) => {
                                                        e.preventDefault()
                                                        chatFunction().sendMessage()
                                                    }}
                                                />
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <section ref={scrollToBottomRef}></section> */}
    </>
  )
}

export default ChatApp