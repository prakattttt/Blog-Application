import { createContext, useEffect, useState } from "react";
import type { AuthInterface } from "../types/context.types";
import { getMe } from "../api/auth.api";

export const AuthContext = createContext<AuthInterface>({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function run() {
      const data = await getMe();

      console.log(data);
      console.log(isLoggedIn);

      if (data.success) {
        setIsLoggedIn(true);
      }
    }

    run();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
