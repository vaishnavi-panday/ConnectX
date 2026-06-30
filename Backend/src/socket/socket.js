const {Server} = require('socket.io')

let io;
const userSocketMap = {};
const initSocket =  (server)=>{
    io= new Server(server, {
        cors:{
            origin:'https://connect-x-flax.vercel.app',
            credentials:true
        }
    })
    io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;
      console.log("User ID:", userId);
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    
    console.log("User Connected", socket.id);
   socket.on('typing', (recieverId)=>{
     const recieverSocketId = getReceiverSocketId(recieverId)
     if(recieverSocketId){
        io.to(recieverSocketId).emit('typing')
     }
   })
   socket.on('stoptyping' , (recieverId)=>{
    const recieverSocketId = getReceiverSocketId(recieverId);
    if(recieverSocketId){
        io.to(recieverSocketId).emit('stoptyping')
    }
   })
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        console.log("User Disconnected", socket.id);
    });
    

});
}
const getIo = ()=> io;
const getReceiverSocketId = (userId)=>{
    return userSocketMap[userId];
}
const getOnlineUser = ()=>{
    return Object.keys(userSocketMap);
}

module.exports = {
    initSocket,
    getIo,
    getReceiverSocketId,
    getOnlineUser
}