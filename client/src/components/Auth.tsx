import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import FormField from "./FormFields";
import type { AuthProps } from "../types/authprops.types";

const Auth = ({ mode }: AuthProps) => {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="px-8 py-8 text-center">
            <h1 className="text-3xl font-extrabold text-black">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              {isLogin
                ? "Login to continue your blogging journey."
                : "Join NodeBlog and start sharing your ideas."}
            </p>
          </div>

          <div className="px-8 pb-8">
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
                className="bg-black text-white rounded-xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
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

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-xs text-gray-400 hover:text-black transition"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;