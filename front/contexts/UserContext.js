import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/config";
import { getMe } from "../api/getMe";
import { useRouter } from "next/router";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    function getInitialState(key, defaultValue = null) {
        var data = typeof window !== "undefined" ? window.localStorage.getItem(key) : defaultValue;
        return data || defaultValue;
    }
    const [token, setToken] = useState(getInitialState("authenticationToken", null));
    const [isLogged, setIsLogged] = useState(getInitialState("isLogged", false));

    useEffect(() => {
        window.localStorage.setItem("authenticationToken", token);
        window.localStorage.setItem("isLogged", isLogged);
    }, [token, isLogged]);

    useEffect(() => {
        if (token?.length > 4) {
            getMe().then((response) => {
                setUser(response);
            });
        }
    }, [token]);

    const logout = async () => {
        if (token !== null) {
            setToken(null);
            setIsLogged(false);
            setUser(null);
        }
        router.push("/");
    };

    const register = async (userInformations) => {
        try {
            const response = await axiosInstance.post(`/api/users`, {
                ...userInformations
            });
            console.log("Utilisateur créé", response);
            setToken(response.jwt);
            setIsLogged(true);
            return response.jwt;
        } catch (e) {
            console.error("Erreur de création d'utilisateur", e);
            throw e;
        }
    };

    const authentication = async (username, password) => {
        const response = (
            await axiosInstance.post("/api/auth/local", {
                identifier: username,
                password: password,
            })
        ).data;
        console.log("response", response);
        if (response) {
            setToken(response.jwt);
            setIsLogged(true);
            return response.jwt;
        }
    };

    return <UserContext.Provider value={{ authentication, register, logout, user, isLogged, token }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
