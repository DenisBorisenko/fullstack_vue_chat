const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name,text,id)=>({name,text,id})

io.on('connection',socket=>{

  socket.on('userJoined',(data,callback)=>{
    if(!data.name || !data.room){
      return callback('Данные некорректны')
    }
    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id:socket.id,
      name:data.name,
      room:data.room
    })
    callback({userId:socket.id})
    io.to(data.room).emit('updateUsers',users.getByRoom(data.room))
    socket.emit('newMessage',m('admin',`Добро пожаловать ${data.name}`))
    socket.broadcast.to(data.room)
      .emit('newMessage',m('admin',`Пользователь ${data.name} зашел.`))

  })
  //user joined

  socket.on('createMessage',(data,callback)=>{
    if(!data.text){
      return callback('Сообщение не может быть пустым')
    }
    const user = users.get(data.id)
    if(user){
      io.to(user.room).emit('newMessage',m(user.name,data.text,data.id))
    }
    callback()
  })
  //message send

  socket.on('userLeft',(id,callback)=>{
    const user = users.remove(id)
    if(user){
      io.to(user.room).emit('updateUsers',users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin',`Пользователь ${user.name} вышел.`))
    }
    callback()
  })
  //user left

  socket.on('disconnect',() => {
    const user = users.remove(socket.id)
    if(user){
      io.to(user.room).emit('updateUsers',users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        m('admin',`Пользователь ${user.name} вышел.`))
    }
  })
  //user close tab
})

module.exports = {
  app,
  server
}
