import Nav from "../components/landing/Nav";

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF8EE] px-6 ">

      <Nav />
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl font-black text-gray-900">
          About <span className="text-[#FF7F66]">ConnectX</span>
        </h1>

        <p className="text-gray-600 text-lg mt-5 leading-8">
          ConnectX is a modern social platform built to help people
          share moments, chat instantly, and build meaningful digital connections
          without clutter or distractions.
        </p>

      </div>

     
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6">

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-3xl mb-3">🚀</div>

          <h2 className="text-xl font-bold mb-2">
            Our Mission
          </h2>

          <p className="text-gray-600 text-sm leading-7">
            To make online communication simple, fast, and beautiful —
            without unnecessary complexity or distractions.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-3xl mb-3">🎯</div>

          <h2 className="text-xl font-bold mb-2">
            Our Vision
          </h2>

          <p className="text-gray-600 text-sm leading-7">
            A world where social networking feels natural, safe,
            and focused on real human connections.
          </p>

        </div>

        
        <div className="bg-white border border-[#FFE5D8] rounded-3xl p-6 shadow-lg hover:scale-105 transition">

          <div className="text-3xl mb-3">💡</div>

          <h2 className="text-xl font-bold mb-2">
            Why ConnectX
          </h2>

          <p className="text-gray-600 text-sm leading-7">
            Unlike traditional platforms, ConnectX focuses on clean UI,
            real-time chat, and smooth user experience.
          </p>

        </div>

      </div>

     
      <div className="max-w-5xl mx-auto mt-20 bg-white border border-[#FFE5D8] rounded-3xl p-10 shadow-xl">

        <h2 className="text-2xl font-black text-center mb-6">
          What Makes Us Different
        </h2>

        <ul className="space-y-4 text-gray-700">

          <li>✨ Clean and minimal UI focused on usability</li>

          <li>⚡ Real-time messaging with instant updates</li>

          <li>🔒 Secure authentication system</li>

          <li>📱 Mobile-friendly responsive design</li>

          <li>🎨 Beautiful pastel-based design system</li>

        </ul>

      </div>

      
      <div className="text-center mt-20">

        <h3 className="text-2xl font-bold">
          Ready to experience ConnectX?
        </h3>

        <p className="text-gray-600 mt-2">
          Join now and start connecting instantly.
        </p>

        <button
          onClick={() => (window.location.href = "/register")}
          className="mt-6 bg-[#FF7F66] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#ff6c4d] transition"
        >
          Get Started
        </button>

      </div>

    </div>
  );
};

export default About;