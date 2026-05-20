import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-8 text-center">
            <h1 className="text-3xl font-extrabold text-black">{title}</h1>
            <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>
          </div>

          <div className="px-8 pb-8">
            {children}

            <div className="mt-6 text-center text-sm text-gray-500">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="text-black font-semibold hover:underline"
              >
                {footerLinkText}
              </Link>
            </div>

            <div className="mt-4 text-center flex justify-center items-center">
              <Link
                to="/"
                className="text-xs text-gray-400 hover:text-black transition flex items-center gap-1"
              >
                <FiArrowLeft size={16} />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
