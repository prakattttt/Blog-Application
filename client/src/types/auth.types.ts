export type AuthMode = "login" | "register";

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name?: string;
  email: string;
  password: string;
}

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface FormDataInterface {
  name?: string;
  email: string;
  password: string;
}
