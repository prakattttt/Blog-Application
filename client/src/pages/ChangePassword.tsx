import SettingsPage from "../layouts/SettingsLayout";

const ChangePassword = () => {
  return (
    <SettingsPage
      title="Change Password"
      description="Choose a strong password to secure your account."
    >
      <div className="space-y-4">
        <input
          type="password"
          placeholder="Current password"
          className="input"
        />

        <input
          type="password"
          placeholder="New password"
          className="input"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="input"
        />
      </div>

      <button className="btn-primary">
        Update Password
      </button>
    </SettingsPage>
  );
};

export default ChangePassword;
