import SettingsPage from "../layouts/SettingsLayout";

const DeleteAccount = () => {
  return (
    <SettingsPage
      title="Delete Account"
      description="This action cannot be undone."
    >
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5">
        <h3 className="font-semibold text-red-600">Permanent Deletion</h3>

        <p className="text-sm text-red-500 mt-2">
          Deleting your account will permanently remove your profile, posts,
          comments, likes, and bookmarks.
        </p>
      </div>

      <input
        type="password"
        placeholder="Enter your password"
        className="input"
      />

      <button className="mt-5 w-full py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700">
        Delete My Account
      </button>
    </SettingsPage>
  );
};

export default DeleteAccount;
