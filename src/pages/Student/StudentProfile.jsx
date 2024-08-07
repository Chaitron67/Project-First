import React from 'react';
import './MyProfile.css';

const StudentProfile = ({ student }) => {


  return (
    <section className="my-profile-section">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <p className='detail-title'><strong>ID :</strong> {student.enrollmentID}</p>
          <p className='detail-title'><strong>Name :</strong> {student.studentName}</p>
        </div>
        <button className="edit-profile-btn" onClick={() => alert('Edit Profile Clicked!')}>Edit Profile</button>
      </div>
    </section>
  );
};

export default StudentProfile;
