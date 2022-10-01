import React from "react";
import "../../css/auth_css/Modal.css"

const Modal = (props) => {       
    
    const closeModal = () => {
        props.closeModal();
    };

    return (
        <div className="modal">
            <div className="modal_body" onClick={e => e.stopPropagation()}> 
                <button className="modal_close_btn" onClick={closeModal}>
                    ✖
                </button>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;