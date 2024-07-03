import React from 'react';
import React, { useState } from 'react';
import './MyProfile.css';

const TeacherProfile = ({ teacher }) => {


  return (
    <section className="my-profile-section">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <p><strong>ID:</strong> {teacher.teacherID}</p>
          <p><strong>Name:</strong> {teacher.teacherName}</p>
          <p><strong>Department:</strong> {teacher.department}</p>
          <p><strong>Subject:</strong> {teacher.subject}</p>
        </div>
        <button className="edit-profile-btn" onClick={() => alert('Edit Profile Clicked!')}>Edit Profile</button>
      </div>
    </section>
  );
};

export default TeacherProfile;
