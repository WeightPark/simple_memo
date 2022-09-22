import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal/Modal"
import DetailModal from "../components/Modal/DetailModal"
import InsertModal from "../components/Modal/InsertModal"
import ReviseModal from "../components/Modal/ReviseModal"
import Header from "../components/Header"
import styles from "../css/LoggedPage.module.css"
import plusMemo from "../img/pencil-icon.png"
import detailMemoImg from "../img/detail.png"
import reviseMemoImg from "../img/revise.png"
import deleteMemoImg from "../img/delete.png"

const LoggedPage = (props) => {
  const [memoInfo, setMemoInfo] = useState([]);
  const [insertOpen, setInsertOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [reviseOpen, setReviseOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/load_memo")
      .then((res) => setMemoInfo(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  const insertMemo = () => {
    setInsertOpen(!insertOpen);
  };

  const detailMemo = () => {
    setDetailOpen(!detailOpen);
  };

  const reviseMemo = () => {
    setReviseOpen(!reviseOpen);
  };

  const deleteMemo = () => {
    
  };

  return (
    <div className={styles.main_container}>
      <div>
        <Header />
      </div>
      <div className={styles.container}>
        {memoInfo !== "fail" ? (
          memoInfo.map((info, seq) => {
            return (
              <div className={styles.memo_container} key={seq}>
                <div className={styles.memo_title_container}>
                  {info.memo_title}
                </div>
                <div className={styles.memo_content_container}>
                  {info.memo_content}
                </div>
                <div className={styles.memo_icon_container}>
                  <img src={detailMemoImg} alt="detail" onClick={detailMemo} />
                  {detailOpen && (
                    <Modal closeModal={() => setDetailOpen(!detailOpen)}>
                      <DetailModal
                        closeDetail={() => setDetailOpen(!detailOpen)}
                        seq={info.seq}
                        title={info.memo_title}
                        content={info.memo_content}
                      />
                    </Modal>
                  )}
                  <span>메모 크게 보기</span>
                  <img src={reviseMemoImg} alt="revise" onClick={reviseMemo} />
                  {reviseOpen && (
                    <Modal closeModal={() => setReviseOpen(!reviseOpen)}>
                      <ReviseModal />
                    </Modal>
                  )}
                  <span>메모 수정</span>
                  <img src={deleteMemoImg} alt="delete" onClick={deleteMemo} />
                  <span>메모 삭제</span>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
        <div className={styles.memo_container}>
          <img src={plusMemo} alt="plusMemo" onClick={insertMemo} />
          {insertOpen && (
            <Modal closeModal={() => setInsertOpen(!insertOpen)}>
              <InsertModal />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggedPage;