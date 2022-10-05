import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import axios from "axios";
import Header from "../components/Header.js";
import styles from "../css/LoginPage.module.css"

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("saveCheckBox") === null) {
      setRememberId(false);
    } else {
      setRememberId(true);
    }
  }, []);

  const inputId = (e) => {
    setId(e.target.value);
  };

  const inputPw = (e) => {
    setPassword(e.target.value);
  };

  const stateChange = () => {
    setRememberId(!rememberId);
  };

  const logIn = (e) => {
    e.preventDefault();
    if (rememberId === true) {
      localStorage.setItem("saveId", id);
      localStorage.setItem("saveCheckBox", rememberId);
    } else {
      localStorage.removeItem("saveId");
      localStorage.removeItem("saveCheckBox");
    }
    const userData = {
      id: id,
      password: password,
    };
    // 아래 axios post 방법과 Join page의 axios post 방식을 다르게 씀(타 프로젝트 작성 시 참고)
    axios
      .post("http://localhost:5000/login", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        data: userData,
      })
      .then((res) => {
        if (res.data.result === "fail") {
          window.alert("아이디나 비밀번호를 확인하세요");
          window.location.replace("/login");
        } else if (res.data.code === 200) {
          setCookie(["token"], res.data, { path: "/" });
          navigate("/memo");
        }
      })
      .catch(function (err) {
        console.log(err); // 이 error에 대해 로그에 기록하는게 필요할거라고 봄
        alert("로그인 실패 : 아이디나 비밀번호를 확인하세요");
      });
  };
  
  return (
    <div className={styles.flex_main_container}>
      <div>
        <Header />
      </div>
      <div className={styles.flex_content_container}>
        <div>
          <form onSubmit={logIn}>
            <div className={styles.flex_login_container}>ID</div>
            <div>
              <input
                type="text"
                onChange={inputId}
                placeholder={
                  localStorage.getItem("saveId") === null
                    ? "아이디"
                    : localStorage.getItem("saveId")
                }
                className={styles.input_underline}
              />
            </div>
            <br />
            <div className={styles.flex_login_container}>PASSWORD</div>
            <div>
              <input
                type="password"
                onChange={inputPw}
                placeholder="비밀번호"
                className={styles.input_underline}
              />
            </div>
            <br />
            <div className={styles.flex_id_save_container}>
              <label className={styles.id_save_switch_button}>
                <input
                  type="checkbox"
                  onChange={stateChange}
                  checked={rememberId}
                />
                <span className={styles.onoff_switch}></span>
              </label>
              <div>아이디 저장</div>
            </div>
            <br />
            <div className={styles.flex_button_container}>
              <button type="submit" className={styles.login_button}>
                로그인 하기
              </button>
            </div>
            <br />
            <br />
            <div>소셜로 간편 로그인 자리</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;