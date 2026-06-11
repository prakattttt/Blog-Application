import useAuth from "../hooks/useAuth";
import SettingsPage from "../layouts/SettingsLayout";

const ChangeProfileImage = () => {
  const { user } = useAuth();
  
  if(!user) return;

  return (
    <SettingsPage
      title="Profile Image"
      description="Upload a new profile picture."
    >
      <div className="flex items-center gap-5">
        <img
          src={user.profileImage}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>
          <input type="file" />

          <button className="btn-primary">
            Upload
          </button>
        </div>
      </div>
    </SettingsPage>
  );
};

export default ChangeProfileImage;
