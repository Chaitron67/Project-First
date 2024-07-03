import React from 'react';
import './MessagePopup.css';

const MessagePopup = ({ message, onClose }) => {
  return (
    <div className="message-popup-overlay">
      <div className="message-popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <label className='message-label'>Message : </label>
        <div className="message-content">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
