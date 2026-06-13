import React from "react";
import useAuth from "../hooks/useAuth";
import SettingsPage from "../layouts/SettingsLayout";
import toast from "react-hot-toast";
import ConfirmChange from "../components/ConfirmChange";

const ChangeName = () => {
  const { user } = useAuth();

  const [name, setName] = React.useState("");
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    setShowConfirm(true);
  };

  return (
    <>
      {showConfirm ? <ConfirmChange setShowConfirm={setShowConfirm} name={name} /> : null}
      <SettingsPage
        title="Change Name"
        description="Update the name displayed on your profile."
      >
        <div className="mb-4">
          <p className="text-sm text-gray-500">Current Name</p>
          <p className="text-xl font-medium text-gray-900 py-2">{user?.name}</p>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Name
        </label>

        <input
          type="text"
          placeholder="Enter your new name"
          className="input"
          onChange={handleChange}
          value={name}
        />

        <button className="btn-primary mt-4" onClick={handleSubmit}>
          Save Changes
        </button>
      </SettingsPage>
    </>
  );
};

export default ChangeName;
