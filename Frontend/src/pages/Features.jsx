import Nav from "../components/landing/Nav";

const Features = () => {
  return (
    <div className="min-h-screen bg-[#FFF8EE] px-6 ">
    <Nav/>
      
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-5xl font-black text-gray-900">
          Powerful <span className="text-[#FF7F66]">Features</span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Everything you need to connect, chat, and share in one place 🚀
        </p>

      </div>

      
      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">💬</div>

          <h2 className="text-xl font-bold mt-3">
            Real-time Chat
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            Chat instantly with your friends with live messaging,
            typing indicators, and message status updates.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">📸</div>

          <h2 className="text-xl font-bold mt-3">
            Media Sharing
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            Share images, files, and documents seamlessly inside chats
            with instant preview support.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">🔍</div>

          <h2 className="text-xl font-bold mt-3">
            Smart User Search
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            Quickly find users and start conversations using our fast
            and intelligent search system.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">⚡</div>

          <h2 className="text-xl font-bold mt-3">
            Instant Updates
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            Powered by real-time sockets for instant message delivery,
            seen status, and live updates.
          </p>

        </div>

       
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">🔒</div>

          <h2 className="text-xl font-bold mt-3">
            Secure Login
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            JWT-based authentication ensures your data and conversations
            remain private and secure.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-4xl">🎨</div>

          <h2 className="text-xl font-bold mt-3">
            Beautiful UI
          </h2>

          <p className="text-gray-600 mt-2 text-sm leading-7">
            Soft pastel design with smooth animations and a modern
            social app experience.
          </p>

        </div>

      </div>

      
      <div className="text-center mt-20">

        <h2 className="text-2xl font-bold text-gray-900">
          Ready to experience ConnectX?
        </h2>

        <p className="text-gray-600 mt-2">
          Start connecting with people instantly.
        </p>

        <button
          onClick={() => (window.location.href = "/register")}
          className="mt-6 bg-[#FF7F66] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#ff6c4d] transition"
        >
          Get Started 🚀
        </button>

      </div>

    </div>
  );
};

export default Features;