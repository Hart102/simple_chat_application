import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "../../../component/Session/Session";
import avater from '../../../asserts/ava3-bg.webp'

export const ChatHeader = ({ Id, onclick, func }) => {
    const navigation = useNavigate();

    const handleLogout = () => {
        if(Session()){
            localStorage.clear("mySession")
            if(!Session()) return navigation('/chat/authenticate')
        }
    }
    return (
        <div className="d-flex align-items-center justify-content-between shadow py-1 px-2" id='chat-title-bar'>
            <section className='d-flex align-items-center'>
                <img src={avater} style={{width: "45px", height: "45px"}} />
                <div className='ms-2'>
                    <p className="fw-bold text-light my-0 ms-2">{Session() && Session().username}</p> 
                    <div className="d-flex align-items-center">
                        <span className='text-light fw-light ms-2'>Online</span>
                        <div style={{width: '10px', height: '10px', background: 'greenYellow',borderRadius: '50%',margin: '0 0.6em'}}></div>
                    </div>
                </div>
            </section>
            <div className="d-flex">
                <i className="fa fa-bars text-light d-lg-none d-xl-none d-xlg-none" onClick={func}></i>
                <i className={!Id ? "d-none" : "fa fa-trash text-light ms-4"} role={'button'} onClick={onclick}></i>
                <i className="fa fa-sign-out text-light mx-4 logout" role={'button'} onClick={handleLogout}></i>
            </div>
        </div>
    )
}



// ssS