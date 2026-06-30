const ProfileStats = ({ user, navigate, id }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12">

      <div className="bg-[#FFF8EE] rounded-3xl py-6 text-center">
        <h2 className="text-4xl font-black">{user.postCount}</h2>
        <p>Posts</p>
      </div>

      <div
        onClick={() => navigate(`/profile/${id}/followers`)}
        className="bg-[#FFF8EE] rounded-3xl py-6 text-center cursor-pointer"
      >
        <h2 className="text-4xl font-black">{user.follwersCount}</h2>
        <p>Followers</p>
      </div>

      <div
        onClick={() => navigate(`/profile/${id}/following`)}
        className="bg-[#FFF8EE] rounded-3xl py-6 text-center cursor-pointer"
      >
        <h2 className="text-4xl font-black">{user.followingCount}</h2>
        <p>Following</p>
      </div>

    </div>
  );
};

export default ProfileStats;