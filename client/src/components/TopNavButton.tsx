import type { TopNavButtonProps } from "../types/navProp.types";

const TopNavButton = ({ icon: Icon, label, onClick, position }: TopNavButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`absolute top-5 ${position === "left" ? "left-5" : "right-5"} flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-black text-white shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/20 active:scale-95`}
    >
      <Icon className="text-lg" />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
};

export default TopNavButton;