import React, { useState } from 'react';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const UpdateTeacherModal = ({ teacher, onClose, onUpdate }) => {
  const [teacherID, setTeacherID] = useState(teacher.teacherID);
  const [teacherName, setTeacherName] = useState(teacher.teacherName);
  const [deptName, setDeptName] = useState(teacher.department);
  const [subject, setSubject] = useState(teacher.subject);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if the teacher ID already exists
    const teachersCollectionRef = collection(db, 'teachersData');
    try {
      const data = await getDocs(teachersCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      const isTeacherIDExists = filterData.some((teacherValue) => teacherValue.teacherID === teacherID && teacherValue.id !== teacher.id);
      
      if (isTeacherIDExists) {
        setErrorMessage('Teacher ID already exists');
        return;
      } else {
        setErrorMessage('');
      }

      const teacherRef = doc(db, 'teachersData', teacher.id);
      await updateDoc(teacherRef, {
        teacherID,
        teacherName,
        department: deptName,
        subject,
        password : teacherID
      });
      onUpdate();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Update Teacher</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className='form-label'>Teacher ID</label>
            <input className='input-value'
              type="text"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className='form-label'>Teacher Name</label>
            <input className='input-value'
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className='form-label'>Department</label>
            <select className='input-value'
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            >
              <option  value="">Select Department</option>
              <option className='input-value' value="Mechanical Engineering">Mechanical Engineering</option>
              <option className='input-value' value="Computer Engineering">Computer Engineering</option>
              <option className='input-value' value="Civil Engineering">Civil Engineering</option>
              <option className='input-value' value="Electrical Engineering">Electrical Engineering</option>
              <option className='input-value' value="Electronics and Communication Engineering">
                Electronics and Communication Engineering
              </option>
            </select>
          </div>
          <div className="form-group">
            <label className='form-label'>Subject</label>
            <input className='input-value'
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacherModal;
