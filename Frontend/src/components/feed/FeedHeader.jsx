import { Sparkles, TrendingUp } from "lucide-react";

const FeedHeader = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 mt-10">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-[#FF7F66] flex items-center justify-center text-white">
              <Sparkles size={22} />
            </div>

            <div>

              <h2 className="text-4xl font-black text-gray-900">
                Your Feed
              </h2>

              <p className="text-gray-500 mt-1">
                Stay connected with everything happening around you.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-3">

          <button className="px-5 py-3 rounded-full bg-[#FFF5EF] hover:bg-[#FFE5D8] transition font-semibold flex items-center gap-2">

            <TrendingUp size={18} />

            Latest

          </button>

          <button className="px-5 py-3 rounded-full bg-[#FFF5EF] hover:bg-[#FFE5D8] transition font-semibold">
            Following
          </button>

        </div>

      </div>

    </section>
  );
};

export default FeedHeader;