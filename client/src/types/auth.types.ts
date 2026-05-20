export type AuthMode = "login" | "register";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
