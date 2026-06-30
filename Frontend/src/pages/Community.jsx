import Nav from "../components/landing/Nav";

const Community = () => {
    
  return (
    <div className="min-h-screen bg-[#FFF8EE] px-6 ">
    <Nav/>
      
      <div className="max-w-5xl mx-auto text-center mb-12">

        <h1 className="text-5xl font-black text-gray-900">
          Community 💬
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          See what people are sharing on ConnectX
        </p>

      </div>

      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=1"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Aarav</h3>
              <p className="text-sm text-gray-400">2 min ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            Just joined ConnectX and already loving the clean UI 🔥
          </p>

        </div>

        
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=2"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Neha</h3>
              <p className="text-sm text-gray-400">10 min ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            The chat feature feels so smooth and modern 💬✨
          </p>

        </div>

        
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=3"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Rohit</h3>
              <p className="text-sm text-gray-400">1 hr ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            This feels like Instagram + WhatsApp combined 🚀
          </p>

        </div>

       
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=4"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Simran</h3>
              <p className="text-sm text-gray-400">2 hr ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            Loving the pastel UI and smooth experience ❤️
          </p>

        </div>

        
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=5"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Vikram</h3>
              <p className="text-sm text-gray-400">3 hr ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            Finally a social app that feels modern and not cluttered 👍
          </p>

        </div>

        
        <div className="bg-white rounded-3xl shadow-lg border border-[#FFE5D8] p-6 hover:scale-105 transition">

          <div className="flex items-center gap-3 mb-4">

            <img
              src="https://i.pravatar.cc/100?img=6"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">Priya</h3>
              <p className="text-sm text-gray-400">5 hr ago</p>
            </div>

          </div>

          <p className="text-gray-700">
            UI is super clean and soft on the eyes 👀✨
          </p>

        </div>

      </div>

    </div>
  );
};

export default Community;