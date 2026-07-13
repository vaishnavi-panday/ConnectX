import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Following = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [following, setFollowing] = useState([]);

  const fetchFollowing = async () => {
    try {
      const res = await api.get(
        `/user/${id}/following`,
        {
          withCredentials: true,
        }
      );

      setFollowing(res.data.following);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FFF5EF] py-10 px-4">

      <div className="max-w-3xl mx-auto">

       
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#FF7F66]">
            Following
          </h1>
          <p className="text-gray-500 mt-2">
            Accounts you are connected with
          </p>
        </div>

       
        {following.length === 0 ? (
          <div className="bg-white border border-[#FFE5D8] rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500 font-medium">
              Not following anyone yet
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Discover people and start building your network 🚀
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {following.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-[#FFE5D8] rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
              >

               
                <div className="flex items-center gap-4">

                  <img
                    src={user.profilepic || "https://via.placeholder.com/100"}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FFE5D8]"
                  />

                  <div>
                    <h2
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="font-semibold text-gray-800 cursor-pointer hover:text-[#FF7F66]"
                    >
                      {user.username}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-1">
                      {user.bio || "No bio available"}
                    </p>
                  </div>

                </div>

                
                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
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

export default Following;