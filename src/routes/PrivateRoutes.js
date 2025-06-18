import { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    let history = useHistory();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(">>> check content usr: ", user);
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
            window.location.reload();
        }
        if (session) {
            //check role
        }

    }, []);
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    )

}
export default PrivateRoutes;