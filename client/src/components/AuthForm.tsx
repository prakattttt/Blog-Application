import FormField from "./FormFields";
import PasswordInput from "./PasswordInput";
import type { AuthMode } from "../types/auth.types";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login";

  return (
    <form className="flex flex-col gap-5">
      {!isLogin && (
        <FormField
          label="Username"
          name="name"
          type="text"
          placeholder="John Doe"
          required
        />
      )}

      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="example@email.com"
        required
      />

      <PasswordInput />

      <button
        type="submit"
        className="bg-black text-white rounded-xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLogin ? "Login" : "Create Account"}
      </button>
    </form>
  );
}
