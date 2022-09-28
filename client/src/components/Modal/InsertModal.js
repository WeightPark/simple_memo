import React, { useState } from "react";
import { useCookies } from 'react-cookie'; 
import axios from "axios";
import qs from 'qs';
import styles from "../../css/auth/InsertModal.module.css"

const InsertModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const inputTitle = (e) => {
    setTitle(e.target.value);
  };

  const inputContent = (e) => {
    setContent(e.target.value);
  };

  const memoInsert = (e) => {
    e.preventDefault();
    const memoData = {
      title: title,
      content: content,
      user_id : cookies.token.id
    };
    if (memoData.title === "" && memoData.content === "") {
      alert("제목, 내용 둘 다 없는 경우 등록되지 않습니다");
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/memo_insert",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(memoData),
      })
        .then((res) => {
          if (res.data.result === "fail") {
            alert("데이터 전송 실패");
          }
          window.location.replace("/memo");
        })
        .catch(function (err) {
          console.log(err);
          alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        });
    }
  };

  return (
    <>
      <form action="submit">
        <div className={styles.memo_container}>
          <div className={styles.memo_title_container}>
            <input
              type="text"
              autoComplete="off"  // 자동 완성 기능 off
              spellCheck="false"  // 맞춤법 검사 OFF
              maxLength={32}
              placeholder="제목"
              onChange={inputTitle}
              id={styles.insert_memo_title}
            />
          </div>
          <div className={styles.memo_content_container}>
            <textarea
              rows={15}
              cols={28}
              maxLength={600}
              spellCheck="false"
              placeholder="내용(600자)"
              onChange={inputContent}
              id={styles.insert_memo_content}
            />
          </div>
        </div>
        <div className={styles.memo_insert_btn_container}>
          <button type="submit" id={styles.memo_insert_btn} onClick={memoInsert}>
            메모 등록
          </button>
        </div>
      </form>
    </>
  );
};

export default InsertModal;