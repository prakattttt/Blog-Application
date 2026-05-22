import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  placeholder = "Enter your password",
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="password" className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...props}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 outline-none transition-all duration-300${
            props.error
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors duration-300 cursor-pointer"
        >
          {showPassword ? (
            <FiEye className="text-xl" />
          ) : (
            <FiEyeOff className="text-xl" />
          )}
        </button>
      </div>
      {props.error && (
        <span className="text-sm text-red-500 font-medium animate-[fadeIn_0.2s_ease]">
          {props.error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
