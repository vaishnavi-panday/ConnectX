import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Image, FileText, ArrowRight } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const location = useLocation();
  const dailyPrompt = location.state?.dailyPrompt;
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (isPosting) return;

    try {
      setIsPosting(true);

      const formData = new FormData(e.target);

      if (dailyPrompt) {
        formData.append("dailyPromptId", dailyPrompt.id);
        formData.append("dailyPromptText", dailyPrompt.text);
      }

      await axios.post(
        "https://connectx-evdy.onrender.com/api/post/create",
        formData,
        { withCredentials: true },
      );

      navigate("/feed");
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = {};

        error.response.data.errors.forEach((err) => {
          validationErrors[err.path] = err.msg;
        });

        setErrors(validationErrors);
      } else {
        console.log(error);
      }
    } finally {
      setIsPosting(false);
    }
  };
  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
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
              {dailyPrompt && (
                <div className="rounded-2xl border border-[#FFD7C8] bg-[#FFF4ED] p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-[#E9684F]">
                    ✨ Responding to today’s prompt
                  </p>

                  <p className="mt-2 text-base font-semibold text-gray-800">
                    {dailyPrompt.text}
                  </p>
                </div>
              )}
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
                    onChange={(e) => {
                      clearError("caption");
                    }}
                  />
                </div>
                {errors.caption && (
                  <p className="text-red-500 text-sm mt-1">{errors.caption}</p>
                )}
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
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPosting}
                className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300
    ${
      isPosting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#FF7F66] hover:bg-[#ff6c4d] hover:shadow-xl hover:-translate-y-1 text-white"
    }`}
              >
                {isPosting ? "Publishing..." : "Publish Post"}
                {!isPosting && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
