import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [unreadByUser, setUnreadByUser] = useState({});
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        "https://connectx-evdy.onrender.com/api/message/chats",
        {
          withCredentials: true,
        }
      );

      setChats(res.data.chat);
      
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUnreadByUser = async () => {
  try {
    const res = await axios.get(
      "https://connectx-evdy.onrender.com/api/message/unread-per-user",
      { withCredentials: true }
    );

    const counts = {};

    res.data.unreadMessages.forEach((item) => {
      counts[item._id] = item.unreadCount;
    });

    setUnreadByUser(counts);
  } catch (error) {
    console.log("Unread-by-user error:", error);
  }
};

 useEffect(() => {
  fetchChats();
  fetchUnreadByUser();
}, []);
 console.log("CHATS:", chats);
console.log("UNREAD BY USER:", unreadByUser);
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-white to-[#FFE5D8]">

    <Navbar />

    <div className="max-w-3xl mx-auto mt-8 px-4">

      
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">
          Messages 💬
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your conversations appear here
        </p>
      </div>

      
      <div className="bg-white/70 backdrop-blur-xl border border-[#FFE5D8] rounded-3xl shadow-xl overflow-hidden">

        
        {chats.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-2">💌</div>
            <p className="text-gray-500 font-medium">
              No chats yet
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Start a conversation to see messages here
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            
            <div
              key={chat._id}
              onClick={() => navigate(`/chat/${chat._id}`)}
              className="flex items-center gap-4 p-4 border-b border-[#FFE5D8] cursor-pointer transition hover:bg-[#FFF5EF] hover:scale-[1.01]"
            >
             
              
              <div className="relative">
                <img
                  src={chat.profilepic || "https://via.placeholder.com/50"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#FFE5D8]"
                />

                
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>

              
              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">
  <h2 className="font-semibold text-gray-800">
    {chat.username}
  </h2>

  {unreadByUser[chat._id] > 0 && (
    <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#FF7F66] px-1 text-xs font-bold text-white">
      {unreadByUser[chat._id] > 99
        ? "99+"
        : unreadByUser[chat._id]}
    </span>
  )}
</div>

                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage || "No messages yet..."}
                </p>

              </div>

              
              <div className="text-[11px] text-gray-500 bg-[#FFF5EF] px-3 py-1 rounded-full border border-[#FFE5D8]">
                {chat.createdAt
                  ? new Date(chat.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })
                  : ""}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  </div>
);
};

export default ChatList;