const express          = require("express");
const { createServer } = require("http");
const { Server }       = require("socket.io");
const { 
  signUpSchema, loginSchema 
} = require("./controllers/userController/joi");

const { 
  dbConnect, createUser, 
  createMessage, SelectAllMessages, deleteMessage
} = require("./module/database/dbConnect");

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (Socket) => { //Sign up function
  Socket.on('Sign up', data => {
    const { error, value } = signUpSchema.validate(data)
    if(!error){
      dbConnect.query(createUser, [value.username, value.password, value.status], (err, result) => 
      {if(!err) return Socket.emit('Sign up', true)
        Socket.emit('Sign up', 'Sign up failed')
      })
    }else{Socket.emit('Sign up', error.message)}
  })
})


io.on('connection', (Socket) =>  { //Login function
  Socket.on('login', data => {
    const {error, value} = loginSchema.validate(data)
    if(!error){
      const selectUser = `SELECT * FROM users WHERE password = "${value.password}"`
      dbConnect.query(selectUser, (err, result) => {
        if(result.length > 0){
          delete result[0].password
          if(result[0].username == value.username) return Socket.emit('login', {response: result[0]})
          Socket.emit('login', 'Incorrect username or password')
        }else{Socket.emit('login', 'Login failed!')}
      })
    }else{Socket.emit('login', error.message)}
  })
})


io.sockets.on('connection', (Socket) => { //Save message in the database
  Socket.on('send message', message => {
    dbConnect.query(
      createMessage, 
      [message.body, message.yourID, message.yourName, message.role]
    )
  })
})


io.on('connection', Socket => {
  Socket.on('delete message', id => {
    dbConnect.query(deleteMessage(id))
  })
})


io.on('connection', (Socket) => {// Load previous messages
  Socket.on('recieve message', (messages) => {
    dbConnect.query(SelectAllMessages, (err, result) => {
      if(!err) return io.emit('recieve message', result)
    })
  })
})


httpServer.listen(5000, () => {
  console.log(`App listening on port 5000`);
});

















// const express = require('express')
// const session = require('express-session')
// const bodyParser = require('body-parser');
// const { Authentication } = require('./controllers/userController/userAuthentication');
// // const Authentication = require

// const app = express()
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/signUp', Authentication)

// app.listen(5000, () => console.log('App running on port 5000'))