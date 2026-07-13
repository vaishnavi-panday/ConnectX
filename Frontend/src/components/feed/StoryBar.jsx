import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
const StoryBar = () => {
  const { user } = useAuth();
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await api.get("/message/chats", );

      setChatUsers(res.data.chat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-8 -mt-10 relative z-10">
      <div className="bg-white rounded-[30px] shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Your Circle</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          <div
            key={user?._id}
            onClick={() => navigate(`/profile/${user?._id}`)}
            className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
          >
            <div className="bg-gradient-to-br from-[#FF7F66] to-[#FFB08A] rounded-full p-[3px]">
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full object-cover border-2 border-white group-hover:scale-105 transition"
              />
            </div>

            <p className="mt-3 text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-gray-400 truncate w-20 text-center">
              {user?.lastMessage}
            </p>
          </div>

          {chatUsers.map((story) => (
            <div
              key={story._id}
              className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-[#FF7F66] to-[#FFB08A] rounded-full p-[3px]">
                  <img
                    src={story.profilepic}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white group-hover:scale-105 transition"
                  />
                </div>

                {story.isOnline && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <p className="mt-3 text-sm font-semibold">{story.username}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryBar;
