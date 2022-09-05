import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from 'qs';
import Header from "../components/Header"
import styles from "../css/JoinPage.module.css"

const JoinPage = () => {
    // 아이디, 비밀번호 확인
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    // 오류 메세지 저장
    const [idMessage, setIdMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [rePwMessage, setRePwMessage] = useState("");

    // 유효성 검사
    const [vaildId, setVaildId] = useState(false);
    const [vaildPw, setVaildPw] = useState(false);
    const [vaildRePw, setVaildRePw] = useState(false);

    const handleInputId = (e) => {
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){5,12}/

        if(regExp.test(e.target.value) === true) {
            setId(e.target.value)
            setIdMessage("유효한 아이디 형식입니다")
            
        } else {
            setIdMessage("유효하지 않은 아이디 형식입니다")
        }
    };

    console.log(idMessage)
    
    const handleInputPw = (e) => {
        let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/

        if(regExp.test(e.target.value) === true) {
            setPassword(e.target.value)
            setPwMessage("유효한 비밀번호 형식입니다")
        } else {
            setPwMessage("유효하지 않은 비밀번호 형식입니다")
        }
    };

    const handleInputRePw = (e) => {
        if(password === e.target.value) {
            setRePwMessage("비밀번호 값이 일치합니다")
        } else {
            setRePwMessage("비밀번호 값이 일치하지 않습니다")
        }
    };

    // const validId = (e) => {                                            /* 정규식을 이용한 아이디 유효성 검사 */
    //     let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z]){6,12}/           /* 영소대문자, 숫자 조합 6~12자 */
    // };

    // const validPw = (e) => {                                            /* 정규식을 이용한 비밀번호 유효성 검사 */
    //     let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/        /* 영소대문자, 특수문자 조합 8~16자 */
    // };

    // const validRePw = (e) => {
    //     if (e.target.value !== password) {
    //         alert("비밀번호가 일치하지 않습니다")
    //     }
    // };
    
    let navigate = useNavigate();

    const id_inspection = (e) => {
        e.preventDefault();
        const input_id = {
            id: id
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
              } else {
                window.alert("사용하실 수 있는 아이디입니다!");
              }
            })
            .catch(function (err) {
              console.log(err); // 이 error에 대해 로그에 기록하는게 필요할거라고 봄
              alert("아이디 중복 체크 실패");
            });
    }

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
                                <span>
                                    {idMessage}
                                </span>
                            </div>
                            <div className={styles.flex_id_duplicate_inspector_button}>
                                <button className={styles.id_duplicate_inspector_button} onClick={id_inspection}>
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
                                placeholder="영소·대문자 구별, 특문 가능 8~16자"
                            />
                            <div className={styles.duplicate_status}>
                                <span>
                                    {pwMessage}
                                </span>
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
                            <span>
                                {rePwMessage}
                            </span>
                        </div>
                        </div>
                        <div className={styles.flex_button_container}>
                            <button type="submit" className={styles.join_button}>
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