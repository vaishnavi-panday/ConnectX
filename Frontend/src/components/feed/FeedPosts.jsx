import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const FeedPosts = ({ posts, fetchPosts }) => {
  const { user } = useAuth();
  const [openCommentPost, setOpenCommentPost] = useState(null);

  const handleLike = async (id) => {
    await axios.patch(
      `https://connectx-evdy.onrender.com/api/post/${id}/likes`,
      {},
      { withCredentials: true },
    );

    fetchPosts();
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios.post(
      `https://connectx-evdy.onrender.com/api/post/${postId}/comment`,
      {
        text: formData.get("comment"),
      },
      { withCredentials: true },
    );

    e.target.reset();
    fetchPosts();
  };

  const deleteComment = async (postId, commentId) => {
    await axios.delete(
      `https://connectx-evdy.onrender.com/api/post/${postId}/comment/${commentId}`,
      { withCredentials: true },
    );

    fetchPosts();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 flex flex-col gap-8">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-3xl shadow-md border border-[#FFE5D8] hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img
                src={
                  post.author?.profilepic || "https://via.placeholder.com/50"
                }
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div>
                <h2 className="font-semibold">{post.author?.username}</h2>

                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <button className="text-gray-400">⋮</button>
          </div>

          {post.dailyPrompt?.id && (
            <div className="mx-5 mb-3 rounded-2xl border border-[#FFD7C8] bg-[#FFF4ED] px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-[#E9684F]">
                ✨ Daily Prompt Response
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700">
                {post.dailyPrompt.text}
              </p>
            </div>
          )}
          <p className="px-5 pb-3">{post.caption}</p>

          {post.image && (
            <div className="px-3">
              <img
                src={post.image}
                className="w-full rounded-2xl max-h-[500px] object-cover"
              />
            </div>
          )}

          <div className="flex justify-between px-5 py-4 border-t">
            <button onClick={() => handleLike(post._id)}>
              🤍 Like {post.likes?.length || 0}
            </button>

            <button
              onClick={() =>
                setOpenCommentPost(
                  openCommentPost === post._id ? null : post._id,
                )
              }
            >
              💬 Comment {post.comments?.length || 0}
            </button>
          </div>

          {openCommentPost === post._id && (
            <div className="px-5 pb-5 border-t bg-[#FFF9F5]">
              <h3 className="font-semibold my-3">Comments</h3>

              <div className="flex flex-col gap-2 mb-4">
                {(post.comments || []).map((comment) => (
                  <div
                    key={comment._id}
                    className="flex justify-between bg-white p-3 rounded-xl"
                  >
                    <span>{comment.text}</span>

                    {comment.user?.toString() === user?.id && (
                      <span
                        onClick={() => deleteComment(post._id, comment._id)}
                        className="text-red-500 cursor-pointer"
                      >
                        🗑
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => handleComment(e, post._id)}
                className="flex gap-2"
              >
                <input
                  name="comment"
                  placeholder="Write a comment..."
                  className="flex-1 border p-2 rounded-full"
                />

                <button className="bg-[#FF7F66] text-white px-4 rounded-full">
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedPosts;
