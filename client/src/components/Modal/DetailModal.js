import React from "react";
import styles from "../../css/DetailModal.module.css"

const DetailModal = ({ seq, title, content, closeDetail }) => {
    console.log(seq)
    return (
    <>
      <div className={styles.memo_container}>
        <div className={styles.memo_title_container}>
            {title}
        </div>
        <div className={styles.memo_content_container}>
            {content}
        </div>
      </div>
      <div className={styles.memo_insert_btn_container}>
        <button onClick={closeDetail}>닫기</button>
      </div>
    </>
  );
};

export default DetailModal;