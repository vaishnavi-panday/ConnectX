const ProfileHeader = ({ user }) => {
  return (
    <div className="relative h-56 bg-gradient-to-r from-[#FFD7C8] via-[#FFE9DD] to-[#FFF8EE]">

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

      <img
        src={user.profilepic}
        className="absolute left-10 -bottom-16 w-36 h-36 rounded-full object-cover border-[6px] border-white shadow-xl"
      />

    </div>
  );
};

export default ProfileHeader;