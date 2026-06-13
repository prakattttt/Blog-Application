import React, { useState } from "react";
import SettingsPage from "../layouts/SettingsLayout";
import toast from "react-hot-toast";
import ConfirmChange from "../components/ConfirmChange";

const ChangeBio = () => {
  const [text, setText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  } 

  const handleSubmit = () => {
        if (!text.trim()) {
      toast.error("Please enter a name");
      return;
    }
    setShowConfirm(true);
  };

  return (
    <>
    {showConfirm && <ConfirmChange setShowConfirm={setShowConfirm} text={text} change={"bio"}/>}
        <SettingsPage
      title="Update Bio"
      description="Tell readers more about yourself."
    >
      <textarea
        rows={6}
        onChange={handleChange}
        value={text}
        maxLength={250}
        className="input resize-none"
        placeholder="Write your bio..."
      />

      <p className="text-sm text-gray-500 mt-2">{text.length} / 250 characters</p>

      <button className="btn-primary" onClick={handleSubmit}>Save Bio</button>
    </SettingsPage>
    </>

  );
};

export default ChangeBio;
