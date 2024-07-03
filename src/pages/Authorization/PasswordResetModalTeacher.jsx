import React, { useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import "../auth.css";

const PasswordResetModalTeacher = ({ onClose }) => {
  const [teacherID, setTeacherID] = useState("");
  const [confirmTeacherID, setConfirmTeacherID] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const teachersCollectionRef = collection(db, 'teachersData');
    try {
      const data = await getDocs(teachersCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const teacher = filterData.find((teacherValue) => teacherValue.teacherID === teacherID);

      if (teacher && teacherID === confirmTeacherID) {
        const teacherRef = doc(db, 'teachersData', teacher.id);
        await updateDoc(teacherRef, { password: newPassword });
        setSuccessMessage('Password reset successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid Teacher ID or IDs do not match');
        setSuccessMessage('');
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Reset Password</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handlePasswordReset}>
          <div className="form-group">
            <label className='form-label'>Teacher ID</label>
            <input className='input-value'
              type="text"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className='form-label'>Confirm Teacher ID</label>
            <input className='input-value'
              type="text"
              value={confirmTeacherID}
              onChange={(e) => setConfirmTeacherID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className='form-label'>New Password</label>
            <input className='input-value'
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetModalTeacher;
