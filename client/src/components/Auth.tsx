import { Link } from "react-router-dom";

type AuthProps = {
  mode: "login" | "register";
};

const Auth = ({ mode }: AuthProps) => {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-black text-white px-8 py-8">
          <h1 className="text-3xl font-extrabold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-300 mt-2 text-sm tracking-widest">
            {isLogin
              ? "Login to continue your blogging journey."
              : "Join NodeBlog and start sharing your ideas."}
          </p>
        </div>

        <div className="p-8">
          <form className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-xl py-3 font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black font-semibold hover:underline"
                >
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
