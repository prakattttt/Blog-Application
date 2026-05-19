import profile from "../assets/profile.jpg";

const Profile = () => {
  return (
    <img
      src={profile}
      alt="profile"
      className="w-10 h-10 md:w-10 rounded-full object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 lg:w-12 lg:h-12"
    />
  );
};

export default Profile;
