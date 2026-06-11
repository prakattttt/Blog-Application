import SettingsPage from "../layouts/SettingsLayout";

const ChangeName = () => {
  return (
    <SettingsPage
      title="Change Name"
      description="Update the name displayed on your profile."
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        New Name
      </label>

      <input
        type="text"
        placeholder="Enter your new name"
        className="input"
      />

      <button className="btn-primary">
        Save Changes
      </button>
    </SettingsPage>
  );
};

export default ChangeName;
