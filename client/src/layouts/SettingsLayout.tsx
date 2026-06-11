import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsLayout = ({
  title,
  description,
  children,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-8"
      >
        <FiArrowLeft />
        Back to settings
      </button>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;