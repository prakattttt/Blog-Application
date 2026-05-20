import type { IconType } from "react-icons";

export type TopNavButtonProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
  position: "left" | "right";
};