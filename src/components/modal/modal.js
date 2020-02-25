import React from "react";

import './modal.css';

const Modal = ({showModal}) =>{
    return (
        <div className='wrap-modal'>
            <div className=" modal">
                <div className="modal__header">Empy Task name</div>
                <div className="modal__text">You are trying close your task name , enter the title and try again</div>
                <div className="wrap-modal-btn">
                    <button className='modal-btn' onClick={showModal}>Close</button>
                </div>
            </div>
         </div>
    )
}

export default Modal;