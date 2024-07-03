import React from 'react';
import './MyProfile.css';

const TeacherProfile = ({ teacher }) => {


  return (
    <section className="my-profile-section">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <p className='detail-title'><strong>ID :</strong> {teacher.teacherID}</p>
          <p className='detail-title'><strong>Name :</strong> {teacher.teacherName}</p>
          <p className='detail-title'><strong>Department :</strong> {teacher.department}</p>
          <p className='detail-title'><strong>Subject :</strong> {teacher.subject}</p>
        </div>
        <button className="edit-profile-btn" onClick={() => alert('Edit Profile Clicked!')}>Edit Profile</button>
      </div>
    </section>
  );
};

export default TeacherProfile;
