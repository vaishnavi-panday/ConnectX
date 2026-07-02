import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, ArrowRight } from "lucide-react";

const FeedHero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const [prompt, setPrompt] = useState(null);
  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await axios.get(
          "https://connectx-evdy.onrender.com/api/post/daily-prompt",
          { withCredentials: true },
        );
        console.log("DAILY PROMPT RESPONSE:", res.data);
        setPrompt(res.data.prompt);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrompt();
  }, []);
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-[#FFF8EE] via-[#FFE9DD] to-[#FFD7C8]">
        <div className="max-w-7xl mx-auto px-8 pt-12 pb-20">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-black text-gray-900">{greeting}</h1>

              <p className="text-gray-600 mt-4 text-lg">
                Welcome back,
                <span className="text-[#FF7F66] font-bold">
                  {" "}
                  {user?.username}
                </span>
              </p>

              <p className="text-gray-500 mt-2">
                Discover what your friends are sharing today.
              </p>
            </div>

            <button className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition">
              <Bell size={24} />
            </button>
          </div>
          {prompt && (
            <div className="mt-10 rounded-3xl border border-[#FFD7C8] bg-white/70 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#FF7F66]">
                    <Sparkles size={17} />
                    Today’s Prompt
                  </div>

                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {prompt.text}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Share your answer with your circle.
                  </p>
                </div>

                <span className="text-3xl">✨</span>
              </div>

              <button
                onClick={() =>
                  navigate("/create-post", {
                    state: { dailyPrompt: prompt },
                  })
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF7F66] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff6c4d]"
              >
                Answer Prompt
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedHero;
