import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { getCurrentUser } from "@/lib/services/user";
import useFetch from "@/lib/hooks/useFetchHook";
import { User } from "@supabase/supabase-js";

interface UrlContextValue {
  user: User | null;
  fetchUser: () => Promise<void>;
  loading: boolean | null;
  isAuthenticated: boolean;
}

const UrlContext = createContext<UrlContextValue | undefined>(undefined);

const UrlContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = (): UrlContextValue => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("UrlState must be used within a UrlProvider");
  }
  return context;
};

export default UrlContextProvider;
