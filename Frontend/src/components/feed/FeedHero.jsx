import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const FeedHero = () => {

    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning ☀️"
            : hour < 18
            ? "Good Afternoon 🌤️"
            : "Good Evening 🌙";

    return (
        <section className="relative overflow-hidden">

            

            <div className="bg-gradient-to-br from-[#FFF8EE] via-[#FFE9DD] to-[#FFD7C8]">

                <div className="max-w-7xl mx-auto px-8 pt-12 pb-20">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-5xl font-black text-gray-900">

                                {greeting}

                            </h1>

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

                    

                    <div className="mt-12 relative">

                        <Search
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                            size={22}
                        />

                        <input
                            placeholder="Search people, posts, hashtags..."
                            className="w-full bg-white rounded-full py-5 pl-16 pr-6 shadow-xl outline-none text-lg placeholder:text-gray-400"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FeedHero;