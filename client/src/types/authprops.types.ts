import type { InputHTMLAttributes } from "react";

export type FormFieldProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type AuthProps = {
  mode: "login" | "register";
};