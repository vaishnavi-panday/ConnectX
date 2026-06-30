const server = require('./src/app.js')
const connectDB = require('./src/db/db.js')
const {initSocket} = require('./src/socket/socket.js')
connectDB()
initSocket(server)
server.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})