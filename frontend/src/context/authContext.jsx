import { createContext } from "react";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import { useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (formData) => {
        try {
            const response = await api.post("/api/auth/login", formData);
            if (response.data.success) {
                setIsAuthenticated(true);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        }
    };

    const register = async (formData) => {
        try {
            const response = await api.post("/api/auth/register", formData);
            if (response.data.success) {
                setIsAuthenticated(true);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
