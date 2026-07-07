import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, checkUser } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(user?.bio || "");
  const [profilepic, setProfilepic] = useState(null);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("bio", bio);

      if (profilepic) {
        formData.append("profilepic", profilepic);
      }

      await axios.put(
        `https://connectx-evdy.onrender.com/api/user/updateprofile/${user.id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      await checkUser();

      navigate(`/profile/${user.id}`);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const validationErrors = {};
        error.response.data.errors.forEach((err) => {
          validationErrors[err.path] = err.msg;
        });
        setErrors(validationErrors);
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#FFE9DD] to-[#FFD7C8] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-gray-900">Edit Profile</h1>

          <p className="text-gray-600 mt-3 text-lg">
            Keep your profile fresh ✨
          </p>
        </div>

        <div className="bg-white rounded-[35px] shadow-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center">
              <img
                src={user?.profilepic}
                className="w-32 h-32 rounded-full object-cover border-[5px] border-[#FFE5D8] shadow-lg"
              />

              <label className="mt-5 bg-[#FFF2EA] text-[#FF7F66] px-5 py-2 rounded-full cursor-pointer font-semibold hover:scale-105 transition">
                Change Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) => setProfilepic(e.target.files[0])}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                />
              </label>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Username</label>

              <input
                type="text"
                value={user?.username}
                disabled
                className="w-full mt-2 px-5 py-4 rounded-2xl bg-gray-100 text-gray-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Bio</label>

              <textarea
                rows="5"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  clearError("bio");
                }}
                placeholder="Tell people something about yourself..."
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-[#FFE5D8] focus:border-[#FF7F66] outline-none resize-none"
              />
            </div>
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF7F66] text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition shadow-lg"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
