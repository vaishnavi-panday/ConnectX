import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import { User, Lock, ArrowRight } from "lucide-react";
const Login = () => {
    const {checkUser} = useAuth();
    const navigate = useNavigate();
    const HandleSubmit= async(e)=>{
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        username:formData.get('username'),
        email:formData.get('email'),
        password:formData.get('password')
      }
      try{
      await axios.post("http://localhost:3000/api/auth/login" , data , {
        withCredentials:true
      })
      await checkUser();
      navigate('/feed')
    }catch(error){
        console.log(error)
    }
    }
 return (
    <div className="min-h-screen bg-[#FFF8EE] overflow-hidden relative">

      

      <div className="absolute w-[500px] h-[500px] bg-[#FFD7C8] rounded-full blur-[150px] opacity-40 -top-40 -right-40" />

      <div className="absolute w-[400px] h-[400px] bg-pink-200 rounded-full blur-[150px] opacity-20 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">

        

        <div className="flex flex-col justify-center px-8 md:px-16">

          <div className="mb-12">

            <h2 className="text-[#FF7F66] text-xl font-bold mb-2">
              SocialApp
            </h2>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Welcome
              <br />
              Back 👋
            </h1>

            <p className="text-gray-500 mt-6 text-lg leading-8">
              Continue your journey and reconnect with your
              friends from anywhere.
            </p>

          </div>

          <form
            onSubmit={HandleSubmit}
            className="space-y-6"
          >

            

            <div>

              <label className="text-gray-700 font-medium mb-2 block">
                Username
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                />

              </div>

            </div>

            

            <div>

              <label className="text-gray-700 font-medium mb-2 block">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                />

              </div>

            </div>


            <button
              type="submit"
              className="w-full bg-[#FF7F66] hover:bg-[#ff6c4d] transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Continue
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="mt-8 text-gray-500">

            Don't have an account?

            <span
              onClick={() => navigate("/register")}
              className="ml-2 text-[#FF7F66] cursor-pointer font-semibold hover:underline"
            >
              Register
            </span>

          </p>

        </div>

        

        <div className="hidden lg:flex items-center justify-center relative">

          <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden w-[650px] border">

            

            <div className="bg-gray-100 h-14 flex items-center gap-3 px-5">

              <div className="w-3 h-3 rounded-full bg-red-400"></div>

              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

              <div className="w-3 h-3 rounded-full bg-green-400"></div>

            </div>

            

            <div className="bg-white p-8">

              <div className="flex items-center gap-4 mb-8">

                <img
                  src="https://i.pravatar.cc/150?img=12"
                  className="w-14 h-14 rounded-full"
                  alt=""
                />

                <div>

                  <div className="font-bold text-lg">
                    Vaishnavi Panday
                  </div>

                  <div className="text-gray-400">
                    @vaishnavi
                  </div>

                </div>

              </div>

              <div className="rounded-3xl overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200"
                  className="w-full h-[280px] object-cover"
                  alt=""
                />

              </div>

              <div className="flex gap-8 mt-6 text-gray-700">

                <span>❤️ 2.4K</span>

                <span>💬 548</span>

                <span>📤 Share</span>

              </div>

              <p className="mt-6 text-gray-600 leading-8">

                Share your stories, connect with amazing people,
                and experience a social platform built with
                simplicity and elegance.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login
