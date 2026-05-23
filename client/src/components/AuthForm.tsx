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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const { setIsLoggedIn, isLoggedIn } = useAuth();

  const isLogin = mode === "login";

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function registerFn({ name, email, password }: RegisterBody) {
    try {
      await registerUser({ name, email, password });
      toast.success("Account created successfully");
      navigate("/user-info", {
        state: {
          fromRegister: true,
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Registration failed");
      }
    }
  }

  async function loginFn({ email, password }: LoginBody) {
    try {
      await loginUser({ email, password });
      toast.success("Logged in successfully");
      setIsLoggedIn(true);
      navigate("/", {
        replace: true
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Login failed");
      }
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
            error={errors.name?.message}
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
          error={errors.email?.message}
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
          placeholder="example@email.com"
        />

        <PasswordInput
          error={errors.password?.message}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },

            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },

            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter",

              hasLowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain at least one lowercase letter",

              hasNumber: (value) =>
                /\d/.test(value) || "Password must contain at least one number",
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
