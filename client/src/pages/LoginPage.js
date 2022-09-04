import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import qs from 'qs';
import Header from "../components/Header";
import "../css/LoginPage.css"

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [boxChecked, setBoxChecked] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("saveCheckBox") === null) {
      setBoxChecked(false);
    } else {
      setBoxChecked(true);
    }
  }, [])

  const handleInputId = (e) => {
    setId(e.target.value);
  };

  const handleInputPw = (e) => {
    setPassword(e.target.value);
  };

  const checkBoxChange = () => {
    setBoxChecked(!boxChecked);
  };

  let navigate = useNavigate();

  const HandleSubmit = (e) => {
    console.log(localStorage)
    e.preventDefault();
    if (boxChecked === true) {
      localStorage.setItem("saveId", id);
      localStorage.setItem("saveCheckBox", boxChecked);
    } else {
      localStorage.removeItem("saveId")
      localStorage.removeItem("saveCheckBox");
    }
    const userData = {
      id: id,
      password: password,
    };
    axios({
      method: "post",
      url: "https://localhost:443/user_check",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(userData),
    })
      .then((res) => {
        if (res.data.result === "fail") {
          window.alert("아이디나 비밀번호를 확인하세요");
          window.location.replace("/login");
        } else if (res.data.result[0] !== undefined) {
          navigate("/")
        }
      })
      .catch(function (err) {
        console.log(err); // 이 error에 대해 로그에 기록하는게 필요할거라고 봄
        alert("로그인 실패 : 아이디나 비밀번호를 확인하세요");
      });
  };

  return (
    <div className="flex-main-container">
        <div className="flex-head-container">
            <Header />
        </div>
        <div className="flex-content-container">
            <div>
              <form onSubmit={HandleSubmit}>
                  <div className="flex-login-container">
                      ID
                  </div>
                  <div>
                      <input 
                          type="text" 
                          onChange={handleInputId}
                          placeholder={localStorage.getItem('saveId') === null ? "아이디": localStorage.getItem('saveId')}
                          className="input_underline"
                      />
                  </div>
                  <br />
                  <div className="flex-login-container">
                      PASSWORD
                  </div>
                  <div>
                      <input
                          type="password" 
                          onChange={handleInputPw}
                          placeholder="비밀번호"
                          className="input_underline"
                      />
                  </div>
                  <br />
                  <div className="flex-id-save-container">
                    <label className="id-save-switch-button">
                      <input type="checkbox" onChange={checkBoxChange} checked={boxChecked}/>
                      <span className="onoff-switch"></span>
                    </label>
                    <div>아이디 저장</div>
                  </div>
                  <div className="flex-button-container">
                    <button type="submit" className="login_button">
                      로그인 하기
                    </button>
                  </div>
                  <br /><br />
                  <div>
                      소셜로 간편 로그인 자리
                  </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;