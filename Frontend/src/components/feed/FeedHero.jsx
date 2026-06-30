import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { quotes } from "../../data/quotes";
const FeedHero = () => {

    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning ☀️"
            : hour < 18
            ? "Good Afternoon 🌤️"
            : "Good Evening 🌙";
   const randomQuote =
  quotes[Math.floor(Math.random() * quotes.length)];
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

                        <div className="mt-12">

    <div className="bg-white rounded-[30px] shadow-xl px-8 py-8 border border-[#FFE5D8]">

        <p className="text-sm uppercase tracking-widest text-[#FF7F66] font-semibold mb-4">

            Quote of the Day

        </p>

        <h2 className="text-3xl font-bold text-gray-800 leading-relaxed">

            "{randomQuote.quote}"

        </h2>

        <p className="mt-6 text-right text-gray-500 italic">

            — {randomQuote.author}

        </p>

    </div>

</div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FeedHero;