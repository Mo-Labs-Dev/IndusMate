import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("indusmate-authenticated") === "true"
  );

  function login() {
    localStorage.setItem("indusmate-authenticated", "true");
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("indusmate-authenticated");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}