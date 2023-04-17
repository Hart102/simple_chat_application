import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import io from 'socket.io-client'
import Input from "../../component/InputField/Input"

const Signup = () => {
  const socket = io.connect('http://localhost:5000', {
    transports: ["websocket"]
  });

  const navigation = useNavigate()
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[status, setStatus] = useState('')
  const[serverMessage, setServerMessage] = useState('')


  return (
    <main className="form-signin d-flex flex-column align-items-center justify-content-center w-100 m-auto"
     style={{height: '100vh', background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))"}}> 
      <p className="text-center text-danger">{serverMessage}</p>
      <form className="col-md-3 pb-5 rounded bg-light shadow">
        <Link to='/' 
          className="nav-link text-dark d-flex justify-content-end p-3"><i className="fa fa-times"></i>
        </Link>
        <h1 className="h3 mb-3 fw-normal text-center fw-bolder">Sign up</h1>
        <main className="px-5">
          <Input type='text' placeholder='Username' onchange={(e) => setUsername(e.target.value)}/>
          <Input type='password' placeholder='Password' onchange={(e) => setPassword(e.target.value)}/>
          <select className="form-control rounded-pill mb-3 py-2" onChange={(e) => setStatus(e.target.value)}>
            <option value="0" hidden='true'>Select Status</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
          </select>
          <button 
            className="w-100 btn btn-lg text-light fw-light rounded-pill" 
            type="submit" style={{background: '#42B1E0'}}
            onClick={(event) => {
              event.preventDefault()
              socket.emit('Sign up', {username, password, status})
              socket.on('Sign up', (data) => {
                data !== true ? setServerMessage(data) : navigation('/chat/room')
              })
            }}
          >Sign up</button>
        </main>
      </form>
    </main>
  )
}

export default Signup