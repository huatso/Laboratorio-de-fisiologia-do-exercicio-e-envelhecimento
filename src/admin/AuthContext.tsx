import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as api from '../api';

interface AuthContextValue {
    isAdmin: boolean;
    username: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<{ role: string }>;
    register: (username: string, password: string) => Promise<{ role: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.me()
            .then(res => {
                setUsername(res.username);
                setIsAdmin(res.role === 'admin');
            })
            .catch(() => {
                setIsAdmin(false);
                setUsername(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (username: string, password: string) => {
        const res = await api.login(username, password);
        setUsername(username);
        setIsAdmin(res.role === 'admin');
        return res;
    };

    const register = async (username: string, password: string) => {
        const res = await api.register(username, password);
        setUsername(username);
        setIsAdmin(res.role === 'admin');
        return res;
    };

    const logout = async () => {
        await api.logout();
        setUsername(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, username, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth precisa estar dentro de um AuthProvider');
    return ctx;
}
