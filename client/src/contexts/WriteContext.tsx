import { createContext, useState } from "react";
import type { writeInterface } from "../types/context.types";

export const WriteContext = createContext<writeInterface | null>(null);

export const WriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(prevOpen => !prevOpen);
  };

  const triggerRefresh = () => {
    setRefreshPosts(prev => !prev);
  };

  return (
    <WriteContext.Provider
      value={{
        isOpen,
        toggle,
        refreshPosts,
        triggerRefresh,
      }}
    >
      {children}
    </WriteContext.Provider>
  );
};
