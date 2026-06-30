import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <div>
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-8 px-8">

    <h1 className="text-3xl font-black tracking-tight">
        Connect<span className="text-[#FF7F66]">X</span>
    </h1>

    <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

          <span
    onClick={() => navigate("/features")}
    className="cursor-pointer hover:text-[#FF7F66] transition"
  >
    Features
  </span>

  <span
    onClick={() => navigate("/community")}
    className="cursor-pointer hover:text-[#FF7F66] transition"
  >
    Community
  </span>

  <span
    onClick={() => navigate("/about")}
    className="cursor-pointer hover:text-[#FF7F66] transition"
  >
    About
  </span>

  


    </div>

    <div className="flex gap-3">

        <button
        onClick={()=>navigate('/login')}
        className="px-5 py-2 rounded-full border hover:bg-white transition">

            Login

        </button>

        <button
        onClick={()=>navigate('/register')}
        className="px-6 py-2 rounded-full bg-[#1D2939] text-white hover:scale-105 transition">

            Get Started

        </button>

    </div>

</nav>
    </div>
  )
}

export default Nav
