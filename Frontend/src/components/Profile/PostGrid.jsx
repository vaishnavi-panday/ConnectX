import PostCard from "./PostCard";

const PostGrid = ({ posts, currentUser, user, HandleDelete }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          currentUser={currentUser}
          user={user}
          HandleDelete={HandleDelete}
        />
      ))}

    </div>
  );
};

export default PostGrid;