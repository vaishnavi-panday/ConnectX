import { useState } from "react";
import axios from "axios";
import Nav from "../components/landing/Nav";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      
      await axios.post("http://localhost:3000/api/contact", form);

      alert("Message sent successfully 🚀");

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EE] px-6">

      <Nav/>
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-5xl font-black text-gray-900">
          Contact <span className="text-[#FF7F66]">Us</span>
        </h1>

        <p className="text-gray-600 mt-4">
          Have a question, feedback, or issue? We’d love to hear from you 💬
        </p>

      </div>

      
      <div className="max-w-2xl mx-auto mt-12 bg-white border border-[#FFE5D8] rounded-3xl shadow-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          
          <div>
            <label className="text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
              required
            />
          </div>

         
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
              required
            />
          </div>

          
          <div>
            <label className="text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF7F66]"
              required
            ></textarea>
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF7F66] text-white py-3 rounded-2xl font-semibold shadow-lg hover:bg-[#ff6c4d] transition"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </form>

      </div>

     
      <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6 text-center">

        <div className="bg-white border border-[#FFE5D8] rounded-2xl p-6 shadow-md">
          <div className="text-3xl">📧</div>
          <h3 className="font-bold mt-2">Email</h3>
          <p className="text-gray-500 text-sm">support@connectx.com</p>
        </div>

        <div className="bg-white border border-[#FFE5D8] rounded-2xl p-6 shadow-md">
          <div className="text-3xl">💬</div>
          <h3 className="font-bold mt-2">Live Chat</h3>
          <p className="text-gray-500 text-sm">Available 24/7 in app</p>
        </div>

        <div className="bg-white border border-[#FFE5D8] rounded-2xl p-6 shadow-md">
          <div className="text-3xl">⚡</div>
          <h3 className="font-bold mt-2">Response</h3>
          <p className="text-gray-500 text-sm">Within 24 hours</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;