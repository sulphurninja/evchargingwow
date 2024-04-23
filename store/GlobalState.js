import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const initialState = { auth: {} };
    const [state, dispatch] = useReducer(reducers, initialState);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            getData('/auth/accessToken').then(res => {
                if (res.err) return localStorage.removeItem("firstLogin");

                // Determine if the response contains user or vendor information
                const isUser = res.user?.email;
                const isVendor = res.vendor?.vendorEmail;

                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        // Include either user or vendor information based on the response
                        authData: isUser ? res.user : isVendor ? res.vendor : null
                    }
                });
            });
        }
    }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};
