import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue your blogging journey."
      footerText="Don’t have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <AuthForm mode="login"  />
    </AuthLayout>
  );
};

export default Login;
