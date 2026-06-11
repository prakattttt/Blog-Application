import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  danger?: boolean;
}

const SettingItem = ({
  icon,
  title,
  description,
  to,
  danger = false,
}: SettingItemProps) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center justify-between p-5
        hover:bg-gray-50 transition
        border-b border-gray-200
        ${danger ? "hover:bg-red-50" : ""}
      `}
    >
      <div className="flex gap-4">
        <div
          className={`
            w-11 h-11 rounded-xl
            flex items-center justify-center
            ${danger ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"}
          `}
        >
          {icon}
        </div>

        <div>
          <h2
            className={`font-semibold ${
              danger ? "text-red-600" : "text-gray-900"
            }`}
          >
            {title}
          </h2>

          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <FiChevronRight className="text-gray-400 text-xl" />
    </Link>
  );
};

export default SettingItem;
