import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, component: Component }) => {

    return authenticated !== "undefined" && authenticated !== undefined ? (
      Component
    ) : (
      <Navigate to="/" {...alert("접근 권한이 없습니다. 로그인 해주세요.")} />
    );
};

export default PrivateRoute;