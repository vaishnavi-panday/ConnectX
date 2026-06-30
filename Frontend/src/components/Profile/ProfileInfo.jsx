const ProfileInfo = ({ user, currentUser, handleFollow, navigate }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 px-10 pt-20">

      {/* LEFT INFO */}
      <div>

        <h1 className="text-5xl font-black text-gray-900">
          {user.username}
        </h1>

        <p className="text-[#FF7F66] mt-2 font-semibold">
          {user.bio || "Building meaningful connections."}
        </p>

        {/* ONLINE STATUS */}
        <div className="flex items-center gap-2 mt-4">

          <div
            className={`w-3 h-3 rounded-full ${
              user.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />

          <span className="text-gray-500">
            {user.isOnline ? "Online" : "Offline"}
          </span>

        </div>

      </div>

      {/* RIGHT BUTTONS */}
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
              className="px-7 py-3 rounded-full bg-[#FF7F66] text-white font-semibold"
            >
              Follow
            </button>

            <button
              onClick={() => navigate(`/chat/${user._id}`)}
              className="px-7 py-3 rounded-full bg-gray-900 text-white font-semibold"
            >
              Chat
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default ProfileInfo;