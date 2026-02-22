import {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const refreshUser = async () => {

        try {
            const res = await fetch("/api/donor/me", {
                credentials: "include",
            });

            if (!res.ok) {
                setUser(null);
                return;
            }

            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error("Failed to refresh User", err);
        }
    };

    return (
        <UserContext.Provider value={{user, setUser, refreshUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);