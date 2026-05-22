import type { FormFieldProps } from "../types/authprops.types";

type Props = FormFieldProps & {
  error?: string;
};

const FormField = ({ label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        {...props}
        className={`border rounded-xl px-4 py-3 outline-none transition-all duration-300 ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20"
        }`}
      />

      {error && (
        <span className="text-sm text-red-500 font-medium animate-[fadeIn_0.2s_ease]">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
