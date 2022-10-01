import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ authenticated, component: Component }) => {

    return authenticated === undefined ||
      authenticated === "undefined" ||
      Object.keys(authenticated).length === 0 ? (
      Component
    ) : (
      <Navigate
        to="/memo"
        {...alert("로그아웃 후 이용해 주세요.")}
      />
    );
};

export default PublicRoute;