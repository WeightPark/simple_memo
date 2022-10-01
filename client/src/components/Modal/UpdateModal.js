import React, { useState } from "react";
import axios from "axios";
import qs from 'qs';
import styles from "../../css/auth_css/UpdateModal.module.css"

const UpdateModal = ({ detailInfo, closeUpdate }) => {
    const [title, setTitle] = useState(detailInfo.title);
    const [content, setContent] = useState(detailInfo.content);

    const onChangeTitle = e => {
        setTitle(e.target.value)
    };

    const onChangeContent = e => {
        setContent(e.target.value)
    };

    const memoUpdate = e => {
        e.preventDefault();
        const postUpdateData = qs.stringify({
            seq : detailInfo.seq,
            title : title,
            content : content
        });
        axios({
            method: "post",
            url: "http://localhost:5000/update_memo",
            headers: { 'Content-type' : 'application/x-www-form-urlencoded' },
            data: postUpdateData
          })
          .then((res) => {
            if (res === "fail") {
              alert("메모 데이터 수정 실패");
            } else {
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
          })
    }

    return (
      <>
        <div className={styles.memo_container}>
          <div className={styles.memo_title_container}>
            <input
              type="text"
              autoComplete="off"  // 자동 완성 기능 OFF
              spellCheck="false"  // 맞춤법 검사 OFF
              maxLength={32}
              defaultValue={detailInfo.memo_title}
              onChange={onChangeTitle}
              id={styles.update_memo_title}
            />
          </div>
          <div className={styles.memo_content_container}>
            <textarea
              rows={15}
              cols={28}
              maxLength={600}
              defaultValue={detailInfo.memo_content}
              onChange={onChangeContent}
              spellCheck="false"
              id={styles.update_memo_content}
            />
          </div>
        </div>
        <div className={styles.memo_update_btn_container}>
          <button onClick={memoUpdate} id={styles.update_btn}>
            수정
          </button>
          <button onClick={closeUpdate} id={styles.update_btn}>
            닫기
          </button>
        </div>
      </>
    );
};

export default UpdateModal;