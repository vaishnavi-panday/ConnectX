import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import CreatePost from './components/CreatePost'
import EditProfile from './pages/EditProfile'
import Followers from './pages/Followers'
import Following from './pages/Following'
import ChatPage from './pages/ChatPage'
import LandingPage from './pages/LandingPage'
import ChatList from './components/ChatList'
import Features from './pages/Features'
import Community from './pages/Community'
import About from './pages/About'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/feed' element={<Feed />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile/:id' element={<Profile />}/>
        <Route path="/create-post" element={<CreatePost />} />
       <Route path="/edit-profile" element={<EditProfile />} />
       <Route path="/profile/:id/followers" element={<Followers />} />
        <Route path="/profile/:id/following" element={<Following />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/message" element={<ChatList />} /> 
        <Route path="/features" element={<Features />} />
        <Route path='/community' element={<Community/>}/>
         <Route path='/about' element={<About/>}/>
         
    
      </Routes>
    </div>
  )
}

export default App
