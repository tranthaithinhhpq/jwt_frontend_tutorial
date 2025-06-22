import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const AppRoutes = () => {
    const { user } = useContext(UserContext);
    const Project = () => <span>projects</span>;

    // Đợi load user xong rồi mới render route
    if (user.isLoading) return null;

    return (
        <Switch>
            <PrivateRoutes path="/users" component={Users} />
            <PrivateRoutes path="/projects" component={Project} />
            <PrivateRoutes path="/roles" component={Role} />

            <Route path="/login">
                {console.log("check user: ", user)}
                {user.isAuthenticated ? <Redirect to="/" /> : <Login />}
            </Route>

            <Route path="/register">
                {user.isAuthenticated ? <Redirect to="/" /> : <Register />}
            </Route>

            <Route path="/" exact>
                home
            </Route>

            <Route path="*">
                404 not found
            </Route>
        </Switch>
    );
};

export default AppRoutes;
