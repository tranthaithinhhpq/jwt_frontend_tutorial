import React, { useState, useEffect } from 'react';
import { getUserAccount } from '../services/userService';
import { useLocation } from "react-router-dom";
const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {

    // User is the name of the "data" that gets stored in context
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    };

    const [user, setUser] = useState(userDefault);


    // Login cập nhật thông tin người dùng
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    // Logout reset dữ liệu người dùng
    const logout = () => {
        setUser({
            name: "",
            auth: false,
        });
    };

    const fetchUser = async () => {
        let response = await getUserAccount();

        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading: false
            };

            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    };

    useEffect(() => {
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUser()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };