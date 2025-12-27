
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [token, setToken] = useState(null);
    const [userId, setUserID] = useState(null);
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                setUserID(decodedToken.userId);
                setRole(decodedToken.accountType);
                localStorage.setItem("role", decodedToken.accountType);
            } catch (error) {
                console.error("Error decoding token:", error);
                // Clear invalid token
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setToken(null);
                setUserID(null);
                setRole(null);
            }
        }
    }, []); // Empty dependency array - only run once on mount

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserID(decodedToken.userId);
                setRole(decodedToken.accountType);
                localStorage.setItem("token", token);
                localStorage.setItem("role", decodedToken.accountType);
            } catch (error) {
                console.error("Error decoding new token:", error);
                setToken(null);
                setUserID(null);
                setRole(null);
            }
        }
    }, [token]);

    const value = {
        token,
        setToken,
        userId,
        role
    };
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
