import { FaUser, FaLock, FaImage, FaTrash, FaInfoCircle } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import SettingItem from "../components/SettingItem";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const AccountSettings = () => {
  const location = useLocation();

  const isRoot = location.pathname === "/settings";

  if (!isRoot) {
    return <Outlet />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

      <p className="text-gray-500 mt-1 mb-8">
        Manage your account and profile information.
      </p>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        <SettingItem
          icon={<FaUser />}
          title="Change Name"
          description="Update your display name"
          to="/settings/name"
        />

        <SettingItem
          icon={<FaLock />}
          title="Change Password"
          description="Keep your account secure"
          to="/settings/password"
        />

        <SettingItem
          icon={<FaInfoCircle />}
          title="Update Bio"
          description="Tell others about yourself"
          to="/settings/bio"
        />

        <SettingItem
          icon={<FaImage />}
          title="Change Profile Image"
          description="Upload a new profile picture"
          to="/settings/profile-image"
        />
      </div>

      <div className="mt-6 border border-red-200 rounded-3xl overflow-hidden">
        <SettingItem
          icon={<FaTrash />}
          title="Delete Account"
          description="Permanently remove your account"
          to="/settings/delete-account"
          danger
        />
      </div>

      <div className="mt-4 text-center flex justify-center items-center">
        <Link
          to="/"
          className="text-[16px] text-gray-500 hover:text-black transition flex items-center gap-1"
        >
          <FiArrowLeft size={18} />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
