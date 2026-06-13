import React, { useState } from "react";
import SettingsPage from "../layouts/SettingsLayout";

const ChangeBio = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  } 

  return (
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

      <button className="btn-primary">Save Bio</button>
    </SettingsPage>
  );
};

export default ChangeBio;
