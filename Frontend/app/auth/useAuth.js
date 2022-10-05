import { useContext } from "react";
import jwtDecode from 'jwt-decode';

import AuthContext from "./context";
import AuthStorage from './storage';

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const logOut = () => {
        setUser(null);
        AuthStorage.removeToken();
    }
    const logIn = (authToken) => {
        //console.log(authToken)
        const user = jwtDecode(authToken);
        setUser(user);
        AuthStorage.storeToken(authToken);
    }

    return { user, logOut, logIn };
}