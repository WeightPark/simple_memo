import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css"

const Header = () => {

    return (
        <div className="flex-container">
            <div className="navLink-container">
                <NavLink to="/" className="navLink" >
                    SIMPLE MEMO
                </NavLink>
            </div>
        </div>
    )
}

export default Header;