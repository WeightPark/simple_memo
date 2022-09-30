import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, component: Component }) => {

    return (
        authenticated !== "undefined" ? Component : <Navigate to='/' {...alert("로그아웃 후 이용해 주십시오.")} />
    )
};

export default PrivateRoute;