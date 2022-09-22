import ReactModal from "react-modal";

// ReactModal은 isOpen prop을 받아 modal의 열고 닫기를 컨트롤하기 때문에
// MyModal 컴포넌틍도 isOpen을 받아서 ReactModal에 전달
const MyModal = ({ isOpen, onSubmit, onCancel }) => {       
    
    const handleClickSubmit = () => {
        onSubmit();
    };

    const handleClickCancel = () => {
        onCancel();
    };
    
    return (
        <ReactModal isOpen={isOpen}>
            <div>모달입니다</div>
            <div>
                <button onClick={handleClickSubmit}>확인</button>
                <button onClick={handleClickCancel}>취소</button>
            </div>
        </ReactModal>
    );
};

export default MyModal;