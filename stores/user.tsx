import create from "zustand";

import { persist } from "zustand/middleware";

interface User {
    username: string;
    email: string;
}

interface UserStore {
    user: User | null | undefined;
    setUser: (e: User | null | undefined) => void;
}

export const useUserStore = create<UserStore>(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: "user-storage", // unique name
        }
    )
);
