import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Camera, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const navigate = useNavigate();
  const { checkUser } = useAuth();
  const [errors, setErrors] = useState({});
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      await axios.post(
        "https://connectx-evdy.onrender.com/api/auth/register",
        formData,
        {
          withCredentials: true,
        },
      );

      await checkUser();

      navigate("/feed");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const newErrors = {};
        error.response.data.errors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
      }
    }
  };
  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFF8EE] overflow-hidden relative">
      <div className="absolute w-[500px] h-[500px] bg-[#FFD7C8] rounded-full blur-[150px] opacity-40 -top-40 -right-40" />

      <div className="absolute w-[400px] h-[400px] bg-pink-200 rounded-full blur-[150px] opacity-20 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-16">
          <div className="mb-10">
            <h2 className="text-[#FF7F66] text-xl font-bold mb-2">SocialApp</h2>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Create
              <br />
              Account 🚀
            </h1>

            <p className="text-gray-500 mt-6 text-lg leading-8">
              Join thousands of people already sharing memories and building
              meaningful connections.
            </p>
          </div>

          <form onSubmit={HandleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
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
                  placeholder="Choose username"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                  onChange={(e) => {
                    clearError("username");
                  }}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                  onChange={(e) => {
                    clearError("email");
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
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
                  placeholder="Create password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                  onChange={(e) => {
                    clearError("password");
                  }}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Profile Picture
              </label>

              <label
                htmlFor="profilepic"
                className="flex flex-col items-center justify-center border-2 border-dashed border-[#FFB49D] rounded-2xl h-36 cursor-pointer hover:bg-[#FFF4EF] transition"
              >
                <Camera size={35} className="text-[#FF7F66]" />

                <p className="mt-3 font-semibold text-gray-700">
                  Upload Profile Picture
                </p>

                <p className="text-sm text-gray-500">Click to browse</p>
              </label>

              <input
                id="profilepic"
                type="file"
                name="profilepic"
                className="hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF7F66] hover:bg-[#ff6c4d] transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-xl"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-gray-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-[#FF7F66] font-semibold cursor-pointer hover:underline"
            >
              Login
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

            <div className="p-8">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200"
                  className="w-full h-[280px] object-cover"
                  alt=""
                />
              </div>

              <h3 className="text-3xl font-bold mt-8">Connect with Everyone</h3>

              <p className="mt-5 text-gray-500 leading-8">
                Build your network, chat with friends, share memories, upload
                photos, and stay connected from anywhere.
              </p>

              <div className="flex gap-8 mt-8 text-3xl">❤️ 💬 📸 🌍</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
