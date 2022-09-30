import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ authenticated, component: Component }) => {

    return authenticated === "undefined" ||
      Object.keys(authenticated).length === 0 ? (
      Component
    ) : (
      <Navigate to="/memo" {...alert("접근 권한이 없습니다. 로그인 해주세요.")} />
    );
};

export default PublicRoute;