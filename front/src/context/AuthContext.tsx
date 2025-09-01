'use client';
import IAppUser from "@/@types/AppUser";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { createContext, useState, ReactNode, useEffect, useContext } from "react";

type AuthContextType = {
    user: IAppUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async() => {},
    fetchUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<IAppUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/auth/me`,
                 {withCredentials: true}
            );
            setUser(res.data.user)
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    },[]);

    const logout = async () => {
        await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true,
        });
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{user,loading,logout,fetchUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);