import { createContext, useContext, useState, useEffect } from "react";

/* ✅ IMPORTANT: export AuthContext */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Auto restore login on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.clear();
      }
    }
  }, []);

  // ✅ Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData?.role) {
      localStorage.setItem("role", userData.role);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // hard redirect to reset app state
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        /* existing */
        user,
        token,
        isLoggedIn: !!token,
        isLoggedInUser: !!token,
        role: user?.role || localStorage.getItem("role") || null,
        login,
        logout,

        /* ✅ ADDITIONAL (for Sidebar / Navbar / Router) */
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ✅ KEEP your existing hook (no breaking change) */
export function useAuthContext() {
  return useContext(AuthContext);
}

/* ✅ DEFAULT EXPORT (correct) */
export default AuthProvider;
