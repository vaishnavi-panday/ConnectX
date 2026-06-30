import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import FeedHero from "../components/feed/FeedHero";
import StoryBar from '../components/feed/StoryBar';
import FeedHeader from '../components/feed/FeedHeader';
import SuggestedPeople from '../components/feed/SuggestedPeople';
import FeedPosts from '../components/feed/FeedPosts';
const Feed = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
     const [posts, setPosts] = useState([]);
    const [openCommentPost, setOpenCommentPost] = useState(null)
     
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/post/feed",{
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
  const handleLike = async (id) => {
  await axios.patch(
    `http://localhost:3000/api/post/${id}/likes`,
    {},
    { withCredentials: true }
  );

  fetchPosts();
};
const handleComment = async (e, postId) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.post(
        `http://localhost:3000/api/post/${postId}/comment`,
        {
          text: formData.get("comment"),
        },
        {
          withCredentials: true,
        }
      );

      e.target.reset();
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/post/${postId}/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );

    fetchPosts(); 
  } catch (error) {
    console.log(error);
  }
};

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