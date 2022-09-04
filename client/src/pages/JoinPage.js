import React from "react";
import Header from "../components/Header"
import "../css/JoinPage.css"

const JoinPage = () => {


    return (
        <div className="flex-main-container">
            <div className="flex-head-container">
                <Header />
            </div>
            <div className="flex-content-container">
                <div className="flex-join-container">
                    <div>
                        회원 가입
                    </div>
                    <div>
                        ID
                    </div>
                    <div>
                        <div className="flex-id-container">
                            id 입력칸
                        </div>
                        <div className="flex-id-container">
                            id 중복 검사 및 유효성 검사 동시 버튼
                        </div>
                    </div>
                    <div>
                        비밀번호
                    </div>
                    <div>
                        비밀번호 입력 칸
                    </div>
                    <div>
                        비밀번호 확인
                    </div>
                    <div>
                        비밀번호 확인 입력 칸
                    </div>
                    <div>
                        회원 가입
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinPage;