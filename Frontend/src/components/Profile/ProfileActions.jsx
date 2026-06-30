const ProfileActions = ({ user, currentUser, navigate, handleFollow }) => {
  return (
    <div className="flex flex-wrap gap-4">

      {currentUser?.id === user?._id ? (
        <button
          onClick={() => navigate("/edit-profile")}
          className="px-7 py-3 rounded-full bg-[#FF7F66] text-white font-semibold shadow-lg"
        >
          Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={handleFollow}
            className={`px-7 py-3 rounded-full text-white font-semibold ${
              user.isFollowing ? "bg-red-500" : "bg-[#FF7F66]"
            }`}
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>

          <button
            disabled={!user.isMutualFollower}
            onClick={() => navigate(`/chat/${user._id}`)}
            className={`px-7 py-3 rounded-full font-semibold ${
              user.isMutualFollower
                ? "bg-gray-900 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Chat
          </button>
        </>
      )}

    </div>
  );
};

export default ProfileActions;