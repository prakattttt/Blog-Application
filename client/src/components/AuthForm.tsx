import FormField from "./FormFields";
import PasswordInput from "./PasswordInput";
import type {
  AuthMode,
  FormDataInterface,
  LoginBody,
  RegisterBody,
} from "../types/auth.types";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { registerUser, loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const { setIsLoggedIn, isLoggedIn } = useAuth();

  const isLogin = mode === "login";

  const navigate = useNavigate();

  if (isLoggedIn) navigate("/");

  const {
    register,
    control,
    handleSubmit,
  } = useForm<FormDataInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function registerFn({ name, email, password }: RegisterBody) {
    try {
      const response = await registerUser({ name, email, password });
      console.log(response);
      navigate("/login");
    } catch (error) {
      throw new Error("Failed to register the user!");
    }
  }

  async function loginFn({ email, password }: LoginBody) {
    try {
      const response = await loginUser({ email, password });
      setIsLoggedIn(true);
      console.log(response);
      navigate("/");
    } catch (error) {
      throw new Error("Failed to login the user!");
    }
  }

  async function onSubmit(data: FormDataInterface) {
    const { name, email, password } = data;

    if (!isLogin) {
      registerFn({ name, email, password });
      return;
    }

    loginFn({ email, password });
  }

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <FormField
            label="Username"
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            placeholder="John Doe"
          />
        )}

        <FormField
          label="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="example@email.com"
        />

        <PasswordInput
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />

        <button
          type="submit"
          className="bg-black text-white rounded-xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}
