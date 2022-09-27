import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import "../css/Header.css";

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

    console.log(cookies)
    useEffect(() => {
        // 여기서 쿠키에 들어있는 token의 유효성을 middleware에서 검사하고 만료되었거나, 토큰이 유효하지 않다면
        // alert로 로그인이 만료되었다, ~~다 알려주고 login 페이지로 보내버려야 함

    }, []);

    const logOut = e => {
        e.preventDefault();
        removeCookie("token", { path : "/" });
        navigate("/");
    }

  return (
    <div className="main-container">
      <div className="head-container">
        <div className="navLink-container">
          <NavLink to="/" className="navLink">
            SIMPLE MEMO
          </NavLink>
        </div>
      </div>
      <div className="logout-container">
        {cookies !== undefined ? (
          <button id="logout_btn" onClick={logOut}>
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