import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
const [caption, setCaption] = useState("");

  const fetchProfile = async () => {
    try {
      const userRes = await axios.get(
        `https://connectx-evdy.onrender.com/api/user/${id}/user`,
        {
          withCredentials: true,
        },
      );

      setUser(userRes.data.details);

      const postRes = await axios.get(
        `https://connectx-evdy.onrender.com/api/post/${id}/user`,
        {
          withCredentials: true,
        },
      );

      setPosts(postRes.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      await axios.post(
        `https://connectx-evdy.onrender.com/api/user/${id}/user`,
        {},
        {
          withCredentials: true,
        },
      );

      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }
  const HandleDelete = async (id) => {
    try {
      await axios.delete(`https://connectx-evdy.onrender.com/api/post/${id}/post`, {
        withCredentials: true,
      });
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };
  const openEdit = (post) => {
    setEditPost(post);
    setCaption(post.caption);
};
const updatePost = async () => {

    try{

        await axios.put(

            `https://connectx-evdy.onrender.com/api/post/${editPost._id}/post`,

            {
                caption
            },

            {
                withCredentials:true
            }

        );
        fetchProfile();
        setEditPost(null);

        

    }

    catch(error){

        console.log(error);

    }

}
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
       <div className="max-w-6xl mx-auto py-10 px-5">

  

  <div className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-[#FFE5D8]">

    

    <div className="relative h-56 bg-gradient-to-r from-[#FFD7C8] via-[#FFE9DD] to-[#FFF8EE]">

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

      

      <img
        src={user.profilepic}
        alt=""
        className="absolute left-10 -bottom-16 w-36 h-36 rounded-full object-cover border-[6px] border-white shadow-xl"
      />

    </div>

    

    <div className="pt-20 px-10 pb-10">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">

        
        <div>

          <h1 className="text-5xl font-black text-gray-900">

            {user.username}

          </h1>

          <p className="text-[#FF7F66] mt-2 font-semibold">
            {user.bio || "Building meaningful connections."}
          </p>

          <div className="flex items-center gap-2 mt-4">

            <div
              className={`w-3 h-3 rounded-full ${
                user.isOnline
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            <span className="text-gray-500">

              {user.isOnline
                ? "Online"
                : "Offline"}

            </span>

          </div>

        </div>

        

        <div className="flex flex-wrap gap-4">

          {currentUser?.id === user?._id ? (

            <button
              onClick={() =>
                navigate("/edit-profile")
              }
              className="px-7 py-3 rounded-full bg-[#FF7F66] text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Edit Profile
            </button>

          ) : (

            <>
              <button
                onClick={handleFollow}
                className={`px-7 py-3 rounded-full text-white font-semibold transition ${
                  user.isFollowing
                    ? "bg-red-500"
                    : "bg-[#FF7F66]"
                }`}
              >
                {user.isFollowing
                  ? "Unfollow"
                  : "Follow"}
              </button>

              <button
                disabled={!user.isMutualFollower}
                onClick={() =>
                  navigate(`/chat/${user._id}`)
                }
                className={`px-7 py-3 rounded-full font-semibold transition ${
                  user.isMutualFollower
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Chat
              </button>

            </>

          )}

        </div>

      </div>

      

      <div className="grid grid-cols-3 gap-6 mt-12">

        <div className="bg-[#FFF8EE] rounded-3xl py-6 text-center shadow-sm">

          <h2 className="text-4xl font-black">

            {user.postCount}

          </h2>

          <p className="text-gray-500 mt-2">

            Posts

          </p>

        </div>

        <div
          onClick={() =>
            navigate(`/profile/${id}/followers`)
          }
          className="bg-[#FFF8EE] rounded-3xl py-6 text-center shadow-sm cursor-pointer hover:scale-105 transition"
        >

          <h2 className="text-4xl font-black">

            {user.follwersCount}

          </h2>

          <p className="text-gray-500 mt-2">

            Followers

          </p>

        </div>

        <div
          onClick={() =>
            navigate(`/profile/${id}/following`)
          }
          className="bg-[#FFF8EE] rounded-3xl py-6 text-center shadow-sm cursor-pointer hover:scale-105 transition"
        >

          <h2 className="text-4xl font-black">

            {user.followingCount}

          </h2>

          <p className="text-gray-500 mt-2">

            Following

          </p>

        </div>

      </div>

      

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <div className="bg-[#FFF8EE] rounded-3xl p-6 hover:-translate-y-2 transition shadow-sm">

          <h3 className="text-xl font-bold">

            🚀 Ready to Connect

          </h3>

          <p className="text-gray-500 mt-3">

            Build meaningful friendships and chat instantly with mutual followers.

          </p>

        </div>

        <div className="bg-[#FFF8EE] rounded-3xl p-6 hover:-translate-y-2 transition shadow-sm">

          <h3 className="text-xl font-bold">

            📸 Share Moments

          </h3>

          <p className="text-gray-500 mt-3">

            Upload images, videos and memories to your followers.

          </p>

        </div>

        <div className="bg-[#FFF8EE] rounded-3xl p-6 hover:-translate-y-2 transition shadow-sm">

          <h3 className="text-xl font-bold">

            ❤️ Grow Community

          </h3>

          <p className="text-gray-500 mt-3">

            Increase engagement through reactions, comments and conversations.

          </p>

        </div>

      </div>

    </div>

  </div>
</div>
       

       

<div className="max-w-6xl mx-auto mt-14">

  <div className="flex justify-between items-center mb-8">

    <div>

      <h2 className="text-4xl font-black text-gray-900">
        Recent Posts
      </h2>

      <p className="text-gray-500 mt-2">
        Moments shared with the community.
      </p>

    </div>

    <div className="bg-[#FFF2EA] px-5 py-2 rounded-full text-[#FF7F66] font-semibold">
      {posts.length} Posts
    </div>

  </div>

  {posts.length === 0 ? (

    <div className="bg-white rounded-3xl shadow-xl py-24 text-center">

      <h3 className="text-3xl font-bold mb-3">
        No Posts Yet
      </h3>

      <p className="text-gray-500">
        Your memories will appear here.
      </p>

    </div>

  ) : (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

      {posts.map((post) => (

        <div
          key={post._id}
          className="group bg-white rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >

          

          <div className="relative overflow-hidden">

            <img
              src={post.image}
              alt=""
              className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
            />

            

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"/>

            

            {currentUser?.id === user?._id && (

<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">

    <button
        onClick={() => openEdit(post)}
        className="bg-white rounded-full w-10 h-10 shadow-lg hover:bg-blue-500 hover:text-white transition"
    >
        ✏️
    </button>

    <button
        onClick={() => HandleDelete(post._id)}
        className="bg-white rounded-full w-10 h-10 shadow-lg hover:bg-red-500 hover:text-white transition"
    >
        🗑
    </button>

</div>

)}

          </div>

          

          <div className="p-6">

            <p className="text-gray-700 leading-7 min-h-[60px]">

              {post.caption}

            </p>

            

            <div className="border-t my-5"/>

            

            <div className="flex justify-between items-center">

              <div className="flex gap-5">

                <div className="flex items-center gap-2">

                  ❤️

                  <span className="font-semibold">

                    {post.likes?.length || 0}

                  </span>

                </div>

                <div className="flex items-center gap-2">

                  💬

                  <span className="font-semibold">

                    {post.comments?.length || 0}

                  </span>

                </div>

              </div>

              <button onClick={() => setSelectedPost(post)} className="text-[#FF7F66] hover:text-[#ff6245] font-semibold">
                View →
              </button>
              
            </div>
            {selectedPost && (
<div className="fixed inset-0 bg-black/90 z-[999] flex justify-center items-center">

    {/* Close */}
    <button
        onClick={() => setSelectedPost(null)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black hover:scale-110 transition"
    >
        ✕
    </button>

    <div className="bg-white rounded-3xl overflow-hidden w-[92%] max-w-6xl h-[90vh] flex">

        {/* IMAGE */}

        <div className="w-[65%] bg-black flex justify-center items-center">

            <img
                src={selectedPost.image}
                className="max-h-full max-w-full object-contain"
            />

        </div>

        {/* RIGHT SIDE */}

        <div className="w-[35%] flex flex-col">

            {/* Author */}

            <div className="p-5 border-b flex gap-3 items-center">

                <img
                    src={selectedPost.author.profilepic}
                    className="w-12 h-12 rounded-full"
                />

                <div>

                    <h2 className="font-bold">
                        {selectedPost.author.username}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {new Date(selectedPost.createdAt).toLocaleDateString()}
                    </p>

                </div>

            </div>

            {/* Caption */}

            <div className="p-5 border-b">

                <p className="leading-7 text-gray-700">
                    {selectedPost.caption}
                </p>

            </div>

            {/* COMMENTS */}

            <div className="flex-1 overflow-y-auto p-5">

                {selectedPost.comments.length === 0 ? (
                    <p className="text-gray-400 text-center mt-10">
                        No comments yet
                    </p>
                ) : (

                    selectedPost.comments.map(comment=>(
                        <div
                            key={comment._id}
                            className="mb-4 border rounded-2xl p-3"
                        >

                            <h3 className="font-semibold">
                                {comment.user?.username || "User"}
                            </h3>

                            <p className="text-gray-600 mt-1">
                                {comment.text}
                            </p>

                        </div>
                    ))

                )}

            </div>

            {/* FOOTER */}

            <div className="border-t p-5">

                <div className="flex justify-between">

                    <span>
                        ❤️ {selectedPost.likes.length}
                    </span>

                    <span>
                        💬 {selectedPost.comments.length}
                    </span>

                </div>

            </div>

        </div>

    </div>

</div>
)}
{editPost && (

<div className="fixed inset-0 bg-black/70 z-[999] flex justify-center items-center">

<div className="bg-white rounded-3xl w-[500px] p-8">

<h2 className="text-3xl font-bold mb-6">
Edit Post
</h2>

<div className="flex justify-center">

<img
src={editPost.image}
className="w-40 rounded-2xl mb-6 shadow"
/>

</div>

<textarea

value={caption}

onChange={(e)=>setCaption(e.target.value)}

className="w-full border rounded-2xl p-4 h-36 resize-none"

placeholder="Write something..."

></textarea>

<div className="flex justify-end gap-3 mt-6">

<button

onClick={()=>setEditPost(null)}

className="px-6 py-3 rounded-xl border"

>

Cancel

</button>

<button

onClick={updatePost}

className="px-6 py-3 rounded-xl bg-[#FF7F66] text-white"

>

Save Changes

</button>

</div>

</div>

</div>

)}

          </div>

        </div>

      ))}

    </div>

  )}

</div>
     </div>
    </>
  );
}

export default Profile;
