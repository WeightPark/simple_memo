import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';  
import "../css/Header.css";
import Auth from "../utils/Auth";

const Header = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  let navigate = useNavigate();

  const LogOut = (e) => {
    e.preventDefault();
    removeCookie("token");
    navigate("/");
  };

  return (
    <div className="main-container">
      <div className="head-container">
        <div className="navLink-container">
          {cookies.token !== "undefined" ? (
            <Link to="/memo" className="navLink">
              SIMPLE MEMO
            </Link>
          ) : (
            <Link to="/" className="navLink">
              SIMPLE MEMO
            </Link>
          )}
        </div>
      </div>
      <div className="logout-container">
        {Auth() === true ? (
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
