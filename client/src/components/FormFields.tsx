import type { FormFieldProps } from "../types/authprops.types"

const FormField = ({ label, ...props }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-2 focus:ring-black/20"
      />
    </div>
  );
};

export default FormField;