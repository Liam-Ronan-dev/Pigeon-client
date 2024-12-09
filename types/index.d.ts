export type AuthContextType = {
    token: string | null;
    register: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
}