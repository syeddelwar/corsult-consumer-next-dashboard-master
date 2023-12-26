import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthState({ children }) {
  const [user, setUser] = useState({
    type: null,
    token: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("corsult-user"));
      if (storage) {
        setUser({
          type: storage.type,
          token: storage.token,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
