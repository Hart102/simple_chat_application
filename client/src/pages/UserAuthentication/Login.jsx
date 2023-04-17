import { useState } from "react"
import io from 'socket.io-client'
import { Link, useNavigate } from "react-router-dom"
import Input from "../../component/InputField/Input"

const Login = () => {
  const socket = io.connect('http://localhost:5000', {
    transports: ["websocket"]
  });

  const navigation = useNavigate()
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const[serverMessage, setServerMessage] = useState('')

  const handleLogin = () => {
    socket.emit('login', {username, password})
    socket.on('login', (data) => {
      !data.response 
      ? setServerMessage(data) 
      : localStorage.setItem("mySession", JSON.stringify(data)); 
      return navigation('/chat/room')
    })
  }

  return (
    <main className="form-signin d-flex flex-column align-items-center justify-content-center 
    w-100 m-auto" style={{height: '100vh', background: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))"}}> 
      <p className="text-center text-danger">{serverMessage}</p>
      <form className="col-md-3 pb-5 rounded bg-light">
        <Link to='/' className="nav-link text-dark d-flex justify-content-end p-3">
          <i className="fa fa-times"></i>
        </Link>
        <h1 className="h3 mb-3 fw-normal text-center fw-bolder">Please sign in</h1>
        <main className="px-5">
          <Input type='text' placeholder='Username' onchange={(e) => setUsername(e.target.value)}/>
          <Input type='password' placeholder='Password' onchange={(e) => setPassword(e.target.value)}/>
          <button 
            className="w-100 btn btn-lg text-light fw-bold rounded-pill" 
            type="submit" style={{background: '#42B1E0'}}
            onClick={(event) => {event.preventDefault(); handleLogin()}}
          >LOG IN</button>
        </main>
      </form>
  </main>
  )
}

export default Login