import { createContext, useEffect } from "react";
import api from "../api/axios.js";
import { useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (formData) => {
        try {
            const response = await api.post("/api/auth/login", formData);
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error?.response?.data?.message || "Login failed");
        }
    };

    const register = async (formData) => {
        try {
            const response = await api.post("/api/auth/register", formData);
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(
                error?.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <AuthContext.Provider value={{ login, register, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
