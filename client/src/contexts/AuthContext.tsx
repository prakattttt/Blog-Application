import { createContext, useEffect, useState } from "react";
import type { AuthInterface } from "../types/context.types";
import { getMe } from "../api/auth.api";

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function run() {
      const data = await getMe();

      if (data.statusCode === 200) {
        setIsLoggedIn(true);
      }
    }

    run();
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
