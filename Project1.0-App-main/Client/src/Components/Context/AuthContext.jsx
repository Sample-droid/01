import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------------------------
  // Axios instance (auto adds Authorization header)
  // -------------------------------------------------
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // -------------------------------------------------
  // Load user info from token on page refresh
  // -------------------------------------------------
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
    }
  }, [token]);

  // -------------------------------------------------
  // Login function
  // -------------------------------------------------
  const login = async (username, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      const receivedToken = res.data.token;
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);

      const decoded = jwtDecode(receivedToken);

      setUser({
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      });

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------
  // Logout
  // -------------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        api,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};