import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const SuggestedPeople = () => {
  const { user, checkUser } = useAuth();
  
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(user){
    fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://connectx-evdy.onrender.com/api/user/all",
        {
          withCredentials: true,
        }
      );
      



let followingIds = user?.followingList;



const suggested = res.data.users.filter(
  (u) =>
    !followingIds.includes(u._id.toString()) &&
    u._id !== user?._id
);

      setUsers(suggested);
      console.log("USER LIST:", users);
    } catch (error) {
      console.log(error);
    }
  };

const handleFollow = async () => {
  const wasFollowing = user.isFollowing;
  setUsers(prev => ({
    ...prev,
    isFollowing: !wasFollowing,
    follwersCount: prev.follwersCount + (wasFollowing ? -1 : 1),
  }));
  try {
    await axios.post(`.../api/user/${id}/user`, {}, { withCredentials: true });
  } catch (error) {
    setUsers(prev => ({ ...prev, isFollowing: wasFollowing, follwersCount: prev.follwersCount + (wasFollowing ? 1 : -1) }));
  }
};
   console.log("users" , users)
  return (
    <section className="max-w-7xl mx-auto px-8 mt-10">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-black">
            People You May Know
          </h2>

          <p className="text-gray-500 mt-1">
            Grow your network with new connections.
          </p>

        </div>

      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

        {users.map((person) => (
        
          <div
            key={person._id}
            className="min-w-[260px] bg-white rounded-[30px] shadow-lg border border-[#FFE5D8] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >

            <div className="h-20 bg-gradient-to-r from-[#FFD7C8] via-[#FFE9DD] to-[#FFF8EE]" />

            <div className="px-6 pb-6">

              <img
                src={person.profilepic}
                onClick={() =>
                  navigate(`/profile/${person._id}`)
                }
                className="cursor-pointer w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg -mt-12 mx-auto hover:scale-105 transition"
              />

              <h3
                onClick={() =>
                  navigate(`/profile/${person._id}`)
                }
                className="cursor-pointer text-center mt-4 text-xl font-bold"
              >
                {person.username}
              </h3>

              <p className="text-center text-gray-500 text-sm mt-2 h-10 line-clamp-2">
                {person.bio || "Let's connect 🚀"}
              </p>

              <button
                onClick={() => handleFollow(person._id)}
                className="mt-6 w-full py-3 rounded-full bg-[#FF7F66] hover:bg-[#ff6b4b] text-white font-semibold transition"
              >
                Follow
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default SuggestedPeople;