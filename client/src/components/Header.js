import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';  
import "../css/Header.css";

const Header = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const LogOut = (e) => {
    e.preventDefault();
    removeCookie("token");
    navigate("/");
  };

  console.log(cookies.token)

  return (
    <div className="main-container">
      <div className="head-container">
        <div className="navLink-container">
          {cookies.token !== undefined && cookies.token !== "undefined" ? (
            <NavLink to="/memo" className="navLink">
              SIMPLE MEMO
            </NavLink>
          ) : (
            <NavLink to="/" className="navLink">
              SIMPLE MEMO
            </NavLink>
          )}
        </div>
      </div>
      <div className="logout-container">
        {cookies.token !== undefined && cookies.token !== "undefined" ? (
          <button id="logout_btn" onClick={LogOut}>
            로그아웃
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
