import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import Navbar from "../components/Navbar";
import FeedHero from "../components/feed/FeedHero";
import StoryBar from '../components/feed/StoryBar';
import FeedHeader from '../components/feed/FeedHeader';
import SuggestedPeople from '../components/feed/SuggestedPeople';
import FeedPosts from '../components/feed/FeedPosts';
const Feed = () => {
    
  
     const [posts, setPosts] = useState([]);
    
     
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://connectx-evdy.onrender.com/api/post/feed",{
            withCredentials:true
          }
        );
       console.log(res.data)
        setPosts(res.data.feed);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {

    fetchPosts();
  }, []);
  
 

  return (
    <div className="min-h-screen bg-gray-100">
       <Navbar />
       <FeedHero />
       <StoryBar/>
       <SuggestedPeople/>
       <FeedHeader/>
       <FeedPosts posts={posts} fetchPosts={fetchPosts}/>
      
    </div>
  );
};

export default Feed;