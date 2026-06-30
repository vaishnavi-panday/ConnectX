import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import Nav from '../components/landing/Nav'
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8EE] overflow-hidden relative">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      <Nav/>
       
    <section className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center px-8 py-20">

    <div>

        <span className="inline-block bg-[#FFD9C7] text-[#8B4513] px-5 py-2 rounded-full font-semibold mb-8">

            Join thousands of creators

        </span>

        <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            Connect Beyond

            <br />

            Just Scrolling.

        </h1>

        <p className="text-gray-600 text-xl mt-8 leading-9 max-w-xl">

            Share your moments, build meaningful conversations,
            discover amazing people and experience real-time social
            interactions designed for the modern generation.

        </p>

        <div className="flex gap-5 mt-10">

            <button
            onClick={()=>navigate('/register')}
            className="bg-[#FF7F66] text-white px-8 py-4 rounded-full shadow-lg hover:scale-105 transition">

                Get Started →

            </button>

            <button
            onClick={()=>navigate('/login')}
            className="border border-gray-300 px-8 py-4 rounded-full hover:bg-white transition">

                Login

            </button>

        </div>

    </div>
<div className="relative hidden lg:flex justify-center items-center h-[650px]">
    <div
className="absolute top-6 left-10 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-5 w-72 animate-float">

<div className="flex items-center gap-3">

<img
src="https://i.pravatar.cc/100?img=5"
className="w-12 h-12 rounded-full"
/>

<div>

<h3 className="font-semibold">
Vaishnavi
</h3>

<p className="text-green-500 text-sm">
● Online
</p>

</div>

</div>

<p className="mt-5 text-gray-700">

Hey! Are we submitting the project today? 🚀

</p>

</div>
<div
className="absolute bottom-20 right-5 bg-white rounded-3xl shadow-2xl overflow-hidden w-64 animate-float2">

<img
src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
className="h-44 w-full object-cover"
/>

<div className="p-4">

<h3 className="font-semibold">
Weekend Memories
</h3>

<p className="text-gray-500 text-sm mt-1">
❤️ 254 Likes
</p>

</div>

</div>
<div
className="absolute bottom-48 left-0 bg-white rounded-2xl shadow-xl px-5 py-4 animate-float3">

<div className="flex gap-3 items-center">

<div className="text-3xl">
📄
</div>

<div>

<p className="font-semibold">

Resume.pdf

</p>

<p className="text-sm text-gray-400">

2.3 MB

</p>

</div>

</div>

</div>
<div className="absolute top-24 right-10 text-5xl animate-bounce">

❤️

</div>

<div className="absolute top-80 right-44 text-4xl animate-bounce delay-300">

🔥

</div>

<div className="absolute bottom-10 left-36 text-5xl animate-bounce delay-700">

😂

</div>
</div>
</section>
      

    </div>
  );
};

export default LandingPage;