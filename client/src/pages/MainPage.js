import React from "react";
import Header from "../components/Header"
import "../css/MainPage.css"

const MainPage = () => {
    return (
        <div className="flex-main-container">
            <div className="flex-head-container">
                <Header />
            </div>
            <div className="flex-content-container">
                본문이 들어갈 곳
            </div>
        </div>
            
    )
};

export default MainPage;