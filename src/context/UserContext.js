import React, { useState } from 'react';

const UserContext = React.createContext({ name: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: "",
        account: {}
    });

    // Login cập nhật thông tin người dùng
    const loginContext = (userData) => {
        setUser(userData);
    };

    // Logout reset dữ liệu người dùng
    const logout = () => {
        setUser({
            isAuthenticated: false,
            token: "",
            account: {}
        });
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };