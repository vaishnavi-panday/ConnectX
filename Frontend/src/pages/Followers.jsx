import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Followers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [followers, setFollowers] = useState([]);

  const fetchFollowers = async () => {
    try {
      const res = await axios.get(
        `https://connectx-evdy.onrender.com/api/user/${id}/followers`,
        { withCredentials: true }
      );

      setFollowers(res.data.followers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FFF5EF] py-10 px-4">

      <div className="max-w-3xl mx-auto">

        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#FF7F66]">
            Followers
          </h1>
          <p className="text-gray-500 mt-2">
            People who support and follow your journey
          </p>
        </div>

        
        {followers.length === 0 ? (
          <div className="bg-white border border-[#FFE5D8] rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500 font-medium">
              No followers yet
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Start sharing posts to grow your audience 🚀
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {followers.map((follower) => (
              <div
                key={follower._id}
                className="bg-white border border-[#FFE5D8] rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
              >

                
                <div className="flex items-center gap-4">

                  <img
                    src={follower.profilepic || "https://via.placeholder.com/100"}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FFE5D8]"
                  />

                  <div>
                    <h2
                      onClick={() => navigate(`/profile/${follower._id}`)}
                      className="font-semibold text-gray-800 cursor-pointer hover:text-[#FF7F66]"
                    >
                      {follower.username}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-1">
                      {follower.bio || "No bio available"}
                    </p>
                  </div>

                </div>

                
                <button
                  onClick={() => navigate(`/profile/${follower._id}`)}
                  className="bg-[#FF7F66] hover:bg-[#ff6b4b] text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-sm"
                >
                  View
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;