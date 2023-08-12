import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthenticatedUser } from "../types";

interface AuthState {
    authenticatedUser: AuthenticatedUser;
    isLogged: boolean;
}

interface AuthActions {
    setUserData: (userData: AuthenticatedUser) => void;
    setIsLogged: (isLogged: boolean) => void;
}

export const useAuthStore = create(
    persist<AuthState & AuthActions>(
        (set) => ({
            authenticatedUser: {
                username: "",
                email: "",
                id: 0,
                token: "",
            },
            isLogged: false,
            setUserData: (authenticatedUser: AuthenticatedUser) =>
                set(() => ({ authenticatedUser })),
            setIsLogged: (isLogged: boolean) => set(() => ({ isLogged })),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
