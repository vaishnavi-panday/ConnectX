import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, LogOut, Home, PlusCircle, User, MessageCircle } from "lucide-react";

const Navbar = () => {
  const { user, setUser, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const handleSearch = async (e) => {
    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://connectx-evdy.onrender.com/api/user/search?q=${value}`,
        { withCredentials: true }
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://connectx-evdy.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      setIsAuthenticated(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUnreadCount = async () => {
  try {
    const res = await axios.get(
      "https://connectx-evdy.onrender.com/api/message/unread-count",
      { withCredentials: true }
    );

    setUnreadCount(res.data.unreadCount || 0);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchUnreadCount();

  const refreshUnreadCount = () => {
    fetchUnreadCount();
  };

  window.addEventListener("refreshUnreadCount", refreshUnreadCount);

  return () => {
    window.removeEventListener("refreshUnreadCount", refreshUnreadCount);
  };
}, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#FFE5D8] shadow-sm px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      <Link
  to="/feed"
  className="text-xl md:text-2xl font-black text-[#FF7F66] tracking-tight"
>
  ConnectX
</Link>

      
      <div className="relative flex-1 max-w-xs md:max-w-md mx-4">

  <div className="relative">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search people..."
      className="hidden md:block w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#FFE5D8] bg-[#FFF8EE] focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
    />

    {/* Mobile Search Icon */}

    <button className="md:hidden w-10 h-10 rounded-xl bg-[#FFF8EE] border border-[#FFE5D8] flex items-center justify-center">
      <Search size={18} />
    </button>

  </div>

  {users.length > 0 && (
    <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-lg border border-[#FFE5D8] z-50 overflow-hidden">

      {users.map((searchedUser) => (

        <div
          key={searchedUser._id}
          onClick={() => {
            navigate(`/profile/${searchedUser._id}`);
            setQuery("");
            setUsers([]);
          }}
          className="flex items-center gap-3 p-3 hover:bg-[#FFF5EF] cursor-pointer transition"
        >

          <img
            src={searchedUser.profilepic || "https://via.placeholder.com/100"}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold">
              {searchedUser.username}
            </h3>

            <p className="text-sm text-gray-500">
              {searchedUser.bio || "No bio"}
            </p>

          </div>

        </div>

      ))}

    </div>
  )}

</div>

      
      <div className="flex items-center gap-1 md:gap-2">

  <Link
    to="/feed"
    className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl hover:bg-[#FFF5EF] hover:text-[#FF7F66] transition"
  >
    <Home size={20} />
    <span className="hidden lg:inline">Home</span>
  </Link>

  <Link
    to="/create-post"
    className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl hover:bg-[#FFF5EF] hover:text-[#FF7F66] transition"
  >
    <PlusCircle size={20} />
    <span className="hidden lg:inline">Post</span>
  </Link>

  <Link
    to={`/profile/${user?.id}`}
    className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl hover:bg-[#FFF5EF] hover:text-[#FF7F66] transition"
  >
    <User size={20} />
    <span className="hidden lg:inline">Profile</span>
  </Link>

 <Link
  to="/message"
  className="relative flex items-center gap-2 px-2 md:px-4 py-2 rounded-2xl text-gray-700 hover:bg-[#FFF5EF] hover:text-[#FF7F66] transition"
>
  <MessageCircle size={20} />

  <span className="hidden lg:inline">Messages</span>

  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold border-2 border-white">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  )}
</Link>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-2xl bg-[#FF7F66] hover:bg-[#ff6c4d] text-white transition"
  >
    <LogOut size={18} />
    <span className="hidden xl:inline">Logout</span>
  </button>

</div>

    </nav>
  );
};

export default Navbar;