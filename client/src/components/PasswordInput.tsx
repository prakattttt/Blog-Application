import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="password" className="text-sm font-semibold text-gray-700">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-300"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-300 cursor-pointer"
        >
          {showPassword ? (
            <FiEyeOff className="text-xl" />
          ) : (
            <FiEye className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
