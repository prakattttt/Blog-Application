import profile from "../assets/profile.jpg";

const Profile = () => {
  return (
    <img
      src={profile}
      alt="profile"
      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300"
    />
  );
};

export default Profile;
