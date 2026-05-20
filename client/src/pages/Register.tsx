import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Join NodeBlog and start sharing your ideas."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <AuthForm mode="register"  />
    </AuthLayout>
  );
};

export default Register;
