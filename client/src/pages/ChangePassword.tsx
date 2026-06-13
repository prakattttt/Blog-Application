import { useForm } from "react-hook-form";
import SettingsPage from "../layouts/SettingsLayout";
import PasswordInput from "../components/PasswordInput";
import toast from "react-hot-toast";
import { verifyPassword } from "../api/auth.api";
import { isAxiosError } from "axios";
import { useState } from "react";
import ConfirmPasswordChange from "../components/ConfirmPasswordChange";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const [showConfirm, setShowCOnfirm] = useState(false);

  const newPassword = watch("newPassword");

  async function onSubmit(data: ChangePasswordForm) {
    try {
      const isMatched = await verifyPassword(data.currentPassword);

      if (!isMatched) {
        toast.error("Incorrect Password! Please try again.");
        return;
      }

      setShowCOnfirm(true);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  return (
    <>
    {showConfirm && <ConfirmPasswordChange setShowConfirm={setShowCOnfirm} newPassword={newPassword}/>}
      <SettingsPage
        title="Change Password"
        description="Choose a strong password to secure your account."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col"
        >
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            error={errors.currentPassword?.message}
            {...register("currentPassword", {
              required: {
                value: true,
                message: "Current password is required",
              },
            })}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: {
                value: true,
                message: "New password is required",
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
                  /\d/.test(value) ||
                  "Password must contain at least one number",
              },
            })}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Please confirm your password",
              },
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />

          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </SettingsPage>
    </>
  );
};

export default ChangePassword;
