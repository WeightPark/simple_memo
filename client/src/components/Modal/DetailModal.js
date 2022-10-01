import React from "react";
import styles from "../../css/auth_css/DetailModal.module.css"

const DetailModal = ({ detailInfo, closeDetail }) => {
  // console.log(detailInfo)
  return (
    <>
      <div className={styles.memo_container}>
        <div className={styles.memo_title_container}>
          {detailInfo.memo_title}
        </div>
        <div className={styles.memo_content_container}>
          {detailInfo.memo_content}
        </div>
      </div>
      <div className={styles.memo_detail_btn_container}>
        <button onClick={closeDetail} id={styles.detail_close_btn}>
          닫기
        </button>
      </div>
    </>
  );
};

export default DetailModal;