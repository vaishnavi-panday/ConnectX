const PostCard = ({ post, currentUser, user, HandleDelete }) => {
  return (
    <div className="group bg-white rounded-[28px] overflow-hidden shadow-md">

      <img
        src={post.image}
        className="w-full h-72 object-cover"
      />

      {currentUser?.id === user?._id && (
        <button
          onClick={() => HandleDelete(post._id)}
          className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full"
        >
          🗑
        </button>
      )}

      <div className="p-6">
        <p>{post.caption}</p>

        <div className="flex justify-between mt-4">
          <span>❤️ {post.likes?.length}</span>
          <span>💬 {post.comments?.length}</span>
        </div>
      </div>

    </div>
  );
};

export default PostCard;