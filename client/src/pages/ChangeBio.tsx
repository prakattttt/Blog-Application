import SettingsPage from "../layouts/SettingsLayout";

const ChangeBio = () => {
  return (
    <SettingsPage
      title="Update Bio"
      description="Tell readers more about yourself."
    >
      <textarea
        rows={6}
        maxLength={250}
        className="input"
        placeholder="Write your bio..."
      />

      <p className="text-sm text-gray-500 mt-2">0 / 250 characters</p>

      <button className="btn-primary">
        Save Bio
      </button>
    </SettingsPage>
  );
};

export default ChangeBio;
