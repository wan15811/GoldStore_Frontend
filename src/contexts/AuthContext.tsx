"use client";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import { recoverUserInformation } from "../services/authenticate";
import { AuthContextType } from "./@types/AuthContext";
import { UserType } from "./@types/User";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const isAuthenticated = !!user;

  const loadUserInformation = async () => {
    const { "nextauth-refresh-token": refreshToken } = parseCookies();
    const { "nextauth-id": id } = parseCookies();
    if (refreshToken) {
      try {
        const response = await recoverUserInformation(refreshToken, id);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    loadUserInformation();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
