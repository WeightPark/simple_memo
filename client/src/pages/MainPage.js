import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header"
import "../css/MainPage.css"

const MainPage = () => {
    return (
        <div className="flex-main-container">
            <div className="flex-head-container">
                <Header />
            </div>
            <div className="flex-content-container">
                <div>
                    <NavLink to="/login" className="link">
                        Sign-in
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/join" className="link">
                        Sign-up
                    </NavLink>
                </div>
            </div>
        </div>
            
    )
};

export default MainPage;