import React from 'react';
import './left.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onMouseLeave={onClose}>
            <div className="setting-modal">
                <ul>
                    <li><a href="/setting/role">Quản lý vai trò</a></li>
                    <li><a href="/setting/account">Quản lý tài khoản</a></li>
                    <li><a href="/setting/userlog">Nhật ký người dùng</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Modal;
