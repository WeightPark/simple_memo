import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import axios from "axios";
import qs from 'qs';
import Header from "../components/Header"
import Modal from "../components/Modal/Modal"
import DetailModal from "../components/Modal/DetailModal"
import InsertModal from "../components/Modal/InsertModal"
import UpdateModal from "../components/Modal/UpdateModal"
import styles from "../css/auth_css/MemoBoard.module.css"
import plusMemo from "../img/pencil-icon.png"
import detailMemoImg from "../img/detail.png"
import updateMemoImg from "../img/update.png"
import deleteMemoImg from "../img/delete.png"

const LoggedPage = () => {
  const [memoInfo, setMemoInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [detailOpen, setDetailOpen] = useState(false);  // 메모 상세보기 모달 창 on / off 여부 state 관리 
  const [updateOpen, setUpdateOpen] = useState(false);  // 메모 수정 모달 창 on / off 여부 state 관리
  const [insertOpen, setInsertOpen] = useState(false);  // 메모 삽입 모달 창 on / off 여부 state 관리
  const [detailInfo, setDetailInfo] = useState([]);     // 상세 보기 모달창에 넘겨줄 메모 상세 정보
  
  let navigate = useNavigate();

  console.log(cookies)

  // user의 메모 데이터 로딩
  useEffect(() => {
    axios
      .get("http://localhost:5000/load_memo", {
        params: { user_id: cookies.token.id },
      })
      .then((res) => setMemoInfo(res.data.result))
      .catch((err) => console.log(err));
    }, []);

  // access token 유효성 체크
  useEffect(() => {
    const token = cookies.token.token;
    axios
      .get("http://localhost:5000/verify_token", {
        headers: { authorization: token },
      })
      .then((res) => {
        console.log("Valid Token");
      })
      .catch((err) => {
        if (err.response.data.code === 419) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        }
        if (err.response.data.code === 401) {
          alert("유효하지 않은 접근 입니다. 로그인을 먼저 해주세요.");
        }
        removeCookie("token")
        navigate("/login")
      });
  });

  const insertMemo = () => {
    setInsertOpen(!insertOpen);
  };

  const detailMemo = item => {
    setDetailOpen(!detailOpen) 
    setDetailInfo(item)
  };

  const updateMemo = item => {
    setUpdateOpen(!updateOpen);
    setDetailInfo(item)
  };

  const deleteMemo = item => {
    if(window.confirm("메모를 삭제하시겠습니까?")) {
      const postDeleteData = qs.stringify({
        seq : item.seq
      })
      axios({
        method: "post",
        url: "http://localhost:5000/delete_memo",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        data: postDeleteData,
      })
        .then((res) => {
          if (res === "fail") {
            alert("메모 삭제 실패")
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } 
  };

  return (
    <div className={styles.main_container}>
      <div>
        <Header />
      </div>
      <div className={styles.container}>
        {memoInfo !== "fail" ? (
          memoInfo.map((item) => {
            return (
              <div className={styles.memo_container} key={item.seq}>
                <div className={styles.memo_title_container}>
                  {item.memo_title}
                </div>
                <div className={styles.memo_content_container}>
                  {item.memo_content}
                </div>
                <div className={styles.memo_icon_container}>
                  <img
                    src={detailMemoImg}
                    alt="detail"
                    onClick={() => detailMemo(item)}
                  />
                  {detailOpen && (
                    <Modal closeModal={() => setDetailOpen(!detailOpen)}>
                      <DetailModal
                        closeDetail={() => setDetailOpen(!detailOpen)}
                        detailInfo={detailInfo}
                      />
                    </Modal>
                  )}
                  <span>메모 크게 보기</span>
                  <img
                    src={updateMemoImg}
                    alt="update"
                    onClick={() => updateMemo(item)}
                  />
                  {updateOpen && (
                    <Modal closeModal={() => setUpdateOpen(!updateOpen)}>
                      <UpdateModal
                        closeUpdate={() => setUpdateOpen(!updateOpen)}
                        detailInfo={detailInfo}
                      />
                    </Modal>
                  )}
                  <span>메모 수정</span>
                  <img
                    src={deleteMemoImg}
                    alt="delete"
                    onClick={() => deleteMemo(item)}
                  />
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