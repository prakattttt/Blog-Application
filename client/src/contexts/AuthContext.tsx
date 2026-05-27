import { createContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import type { AuthInterface } from "../types/context.types";
import { getMe } from "../api/auth.api";

export const AuthContext = createContext<AuthInterface>({
  isLoggedIn: false,
  loading: true,
  user: null,
  setUser: () => {},
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        const data = await getMe();

        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status !== 401) {
            console.log(error.response?.data.message);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
