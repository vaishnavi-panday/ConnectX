import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Image, FileText, ArrowRight } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      await axios.post("http://localhost:3000/api/post/create", formData, {
        withCredentials: true,
      });

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8EE] relative overflow-hidden flex items-center justify-center px-4">

        
        <div className="absolute w-[500px] h-[500px] bg-[#FFD7C8] rounded-full blur-[150px] opacity-40 -top-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-pink-200 rounded-full blur-[150px] opacity-20 bottom-0 left-0" />

        
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-[28px] shadow-2xl border border-gray-100 overflow-hidden">

          
          <div className="bg-gray-100 h-12 flex items-center gap-2 px-5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          
          <div className="p-10">

           
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900">
                Create Post ✨
              </h1>
              <p className="text-gray-500 mt-2">
                Share your thoughts, moments, and creativity
              </p>
            </div>

            
            <form onSubmit={HandleSubmit} className="space-y-6">

             
              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Caption
                </label>

                <div className="relative">
                  <FileText
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="caption"
                    placeholder="What's on your mind?"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
                  />
                </div>
              </div>

              
              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Upload Image
                </label>

                <div className="relative">
                  <Image
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="file"
                    name="image"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#FF7F66] file:text-white hover:file:bg-[#ff6c4d]"
                  />
                </div>
              </div>

              
              <button
                type="submit"
                className="w-full bg-[#FF7F66] hover:bg-[#ff6c4d] transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Publish Post
                <ArrowRight size={18} />
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;