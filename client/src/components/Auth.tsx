import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaHome } from "react-icons/fa";

import PasswordInput from "./PasswordInput";
import FormField from "./FormFields";
import TopNavButton from "./TopNavButton";

import type { AuthProps } from "../types/authprops.types";

const Auth = ({ mode }: AuthProps) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

      <TopNavButton
        icon={FaArrowCircleLeft}
        label="Back"
        position="left"
        onClick={() => navigate(-1)}
      />

      <TopNavButton
        icon={FaHome}
        label="Home"
        position="right"
        onClick={() => navigate("/")}
      />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-black text-white px-8 py-8">
          <h1 className="text-3xl font-extrabold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-300 mt-2 text-sm">
            {isLogin
              ? "Login to continue your blogging journey."
              : "Join NodeBlog and start sharing your ideas."}
          </p>
        </div>

        <div className="p-8">
          <form className="flex flex-col gap-5">

            {!isLogin && (
              <FormField
                label="Username"
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
            )}

            <FormField
              label="Email"
              id="email"
              type="email"
              placeholder="example@email.com"
              required
            />

            <PasswordInput />

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3 font-semibold hover:scale-[1.02] transition-all duration-300 active:scale-95"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-black font-semibold">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-black font-semibold">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;