import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from "zustand/middleware";
import React from "react";
export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    address?: string;

}
type AuthStore = {
    user: User | null;
    isSignedIn: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<boolean>;
    signUp: (name: string, email: string, password: string) => Promise<boolean>;
    signOut: () => void;

};

const MOCK_USERS = [
    { id: '1', name: 'John Doe', email: 'john@gmail.com', password: '123456', phone: '+1234567890', avatar: '' },
    { id: '2', name: 'Jane Doe', email: 'jane@gmail.com', password: '123456', phone: '+1234567891', avatar: '' },
];

export const useAuthStore = create<AuthStore>()
    (

        persist((set) => ({
            user: null,
            isSignedIn: false,
            isLoading: false,
            signIn: async (email, password) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
                if (user) {
                    set({ user, isSignedIn: true, isLoading: false });
                    return true;
                }
                set({ isLoading: false });
                return false;
            },
            signUp: async (name, email, password) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const user = MOCK_USERS.find((u) => u.email === email);
                if (user) {
                    set({ isLoading: false });
                    return false;
                }
                const newUser = { id: Date.now().toString(), name, email, password };
                MOCK_USERS.push(newUser as any);
                set({ user: newUser, isSignedIn: true, isLoading: false });
                return true;
            },
            signOut: () => {
                set({ user: null, isSignedIn: false });
            },
        }), {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),

        }))


export const useAuthHydrated = () => {
    const [hydrated, setHydrated] = React.useState(useAuthStore.persist.hasHydrated());

    React.useEffect(() => {
        const unsubHydrate = useAuthStore.persist.onHydrate(() => setHydrated(false));
        const unsubFinish = useAuthStore.persist.onFinishHydration(() => setHydrated(true));

        return () => {
            unsubHydrate();
            unsubFinish();
        };
    }, []);

    return hydrated;
};