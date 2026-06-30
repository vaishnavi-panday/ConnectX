require('dotenv').config();
const http = require('http')
const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const messageRoutes = require('./routes/message.routes')
const cors = require('cors')

const app = express();
const server = http.createServer(app)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use('/api/auth' , authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/message' , messageRoutes)
module.exports = server;