import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from 'qs';
import Header from "../components/Header"
import styles from "../css/JoinPage.module.css"

const JoinPage = () => {
    // 아이디, 비밀번호, 비밀번호 재확인 확인
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    // 유효성 여부 메세지 저장
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [rePwMessage, setRePwMessage] = useState("");

    // 유효성 확인(회원가입 버튼 클릭 시 데이터 전송 여부를 결정짓는 요소)
    const [clickIdDup, setClickIdDup] = useState(false);            // 아이디 중복 검사 버튼 클릭 유무 확인
    const [idOverlapCheck, setIdOverlapCheck] = useState(false);    // 아이디 중복 유효성 확인
    const [idDupCheck, setIdDupCheck] = useState(false);            // 아이디 유효성 확인
    const [pwDupCheck, setPwDupCheck] = useState(false);            // 비밀번호 유효성 확인
    const [rePwCheck, setRePwCheck] = useState(false);              // 비밀번호 확인 일치 여부
    
    // 아이디, 비밀번호 입력 양식 유효성 검사
    const regExpId = /^[A-Za-z0-9]{6,12}$/        
    const regExpPw = /^.*(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/

    // 아이디 입력 시 함수
    const handleInputId = (e) => {
      if (regExpId.test(e.target.value) === true) {
        setId(e.target.value);
        setIdDupCheck(true);
        setIdMessage("유효한 아이디 형식입니다");
      } else {
        setIdDupCheck(false);
        setIdMessage("유효하지 않은 아이디 형식입니다");
      }
    };
    
    // 비밀번호 입력 시 함수
    const handleInputPw = (e) => {
      if (regExpPw.test(e.target.value) === true) {
        if (e.target.value === rePassword) {
          setRePwCheck(true);
          setRePwMessage("비밀번호가 일치합니다");
        } else if (e.target.value !== rePassword && rePassword !== "") {
          setRePwCheck(false);
          setRePwMessage("비밀번호가 일치하지 않습니다");
        }
        setPassword(e.target.value);
        setPwDupCheck(true);
        setPwMessage("유효한 비밀번호 형식입니다");
      } else if (regExpPw.test(e.target.value) === false) {
        if (rePassword !== "") {
          setRePwMessage("유효한 비밀번호를 먼저 입력해주세요");
        } else {
          setRePwMessage("");
        }
        setPassword(e.target.value);
        setPwDupCheck(false);
        setPwMessage("유효하지 않은 비밀번호 형식입니다");
      }
    };

    // 비밀번호 재확인 입력 시 함수
    const handleInputRePw = (e) => {
      if (pwDupCheck === true) {                    // 비밀번호 유효성 체크 통과 시
        if (e.target.value === password) {          // 입력된 비밀번호 재확인 값과 패스워드 값 일치 시
          setRePwCheck(true);
          setRePassword(e.target.value);
          setRePwMessage("비밀번호가 일치합니다");
        } else if (e.target.value !== "") {         // 입력된 비밀번호 재확인 값이 빈 값이 아닐 때
          setRePwCheck(false);
          setRePwMessage("비밀번호가 일치하지 않습니다");
        } else {
          setRePwCheck(false);
          setRePwMessage("");
        }
      } else if (pwDupCheck === false) {            // 비밀번호 유효성 체크 미통과 시
        if (e.target.value !== "") {
          setRePassword(e.target.value);
          setRePwMessage("유효한 비밀번호를 먼저 입력해 주세요");
        } else {
          setRePwMessage("");
        }
        setRePwCheck(false);
      }
    };
    
    let navigate = useNavigate();

    // 아이디 중복 검사 버튼 클릭 시 함수
    const id_inspection = (e) => {
      e.preventDefault();
      if (id !== "" && idDupCheck === true) {
        setClickIdDup(true);
        const input_id = {
          id: id,
        };
        axios({
          method: "post",
          url: "https://localhost:443/id_duplicate_check",
          headers: { "Content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(input_id),
        })
          .then((res) => {
            if (res.data.result === "fail") {
              window.alert("이미 존재하는 아이디입니다");
              setIdOverlapCheck(false);
            } else {
              window.alert("사용하실 수 있는 아이디입니다!");
              setIdOverlapCheck(true);
            }
          })
          .catch(function (err) {
            console.log(err); // 이 error에 대해 로그에 기록하는게 필요할거라고 봄
            alert("아이디 중복 체크 실패");
          });
      } else {
        alert("유효하지 않은 아이디 입니다");
      }
    };

    // 회원 가입 제출 버튼 클릭 시 함수
    const submit_join_info = (e) => {
      e.preventDefault();
      const join_info = {
        id: id,
        password: password,
      };
      if (clickIdDup === false) {
        alert("아이디 중복 검사를 먼저 실행하세요!");
      } else {
        if (idOverlapCheck === false) {
          alert("이미 같은 아이디로 가입된 회원이 있습니다");
        } else {
          if (
            idDupCheck === false ||
            pwDupCheck === false ||
            rePwCheck === false
          ) {
            alert("입력 정보를 다시 확인해주세요");
          } else {
            axios({
              method: "post",
              url: "https://localhost:443/sign_up",
              headers: { "Content-type": "application/x-www-form-urlencoded" },
              data: qs.stringify(join_info),
            })
              .then((res) => {
                if (res.data.result === "fail") {
                  window.alert("입력된 정보를 다시 확인하세요");
                } else {
                  window.alert("회원 가입 완료");
                  navigate("/main");
                }
              })
              .catch(function (err) {
                console.log(err); // 이 error에 대해 로그에 기록하는게 필요할거라고 봄
                alert("회원 가입 실패");
              });
          }
        }
      }
    };

    return (
      <div className={styles.flex_main_container}>
        <div className={styles.flex_head_container}>
          <Header />
        </div>
        <div className={styles.flex_content_container}>
          <form action="submit">
            <div className={styles.flex_join_container}>
              <div>
                <div className={styles.flex_id_input_container}>
                  아이디 :<br />
                  <input
                    type="text"
                    className={styles.input_underline}
                    onChange={handleInputId}
                    placeholder="영소·대문자, 숫자 조합 6~12자"
                  />
                </div>
                <div className={styles.duplicate_status}>
                  <span>{idMessage}</span>
                </div>
                <div className={styles.flex_id_duplicate_inspector_button}>
                  <button
                    className={styles.id_duplicate_inspector_button}
                    onClick={id_inspection}
                  >
                    아이디 중복 검사
                  </button>
                </div>
              </div>
              <div>
                비밀번호 :<br />
                <input
                  type="password"
                  className={styles.input_underline}
                  onChange={handleInputPw}
                  placeholder="영소(대)문자, 숫자, 특수문자 조합 8~16자"
                />
                <div className={styles.duplicate_status}>
                  <span>{pwMessage}</span>
                </div>
              </div>
              <div>
                비밀번호 재확인 :<br />
                <input
                  type="password"
                  className={styles.input_underline}
                  onChange={handleInputRePw}
                />
                <div className={styles.duplicate_status}>
                  <span>{rePwMessage}</span>
                </div>
              </div>
              <div className={styles.flex_button_container}>
                <button
                  type="submit"
                  className={styles.join_button}
                  onClick={submit_join_info}
                >
                  회원 가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default JoinPage;