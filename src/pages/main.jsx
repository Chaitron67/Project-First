import React, { useState } from 'react';
import Choose from './Authorization/Choose';
import { Routes, Route } from 'react-router-dom';
import Register from './Authorization/register';
import TeacherLogin from './Authorization/TeacherLogin';
import StudentLogin from './Authorization/StudentLogin';
import AddTeacher from './Admin/addTeacher.jsx';
import ViewTeachers from './Admin/ViewTeachers.jsx';
import ApproveStudents from './Admin/ApproveStudents.jsx';
import Schedule from './Teacher/Schedule.jsx';
import ViewSchedule from './Teacher/ViewSchedule.jsx';
import Requests from './Teacher/Requests.jsx';
import BookAppointment from './Student/BookAppointment.jsx';
import Navbar from './Navigation/navbar.jsx';
import '../firebase.js';
import GetAppointment from './Student/GetAppointment.jsx';
import MyAppointments from './Student/MyAppointments.jsx';
import TeacherProfile from './Teacher/TeacherProfile.jsx';
import StudentProfile from './Student/StudentProfile.jsx';

const Main = () => {
  const [title, setTitle] = useState("MAIN");
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);

  const changeTitle = (title) => {
    setTitle(title);
  };

  const changeUser = (user, role) => {
    if (role === 'STUDENT') {
      setTitle("STUDENT");
      setStudent(user);
    } else if (role === 'TEACHER') {
      setTitle("TEACHER");
      setTeacher(user);
    }
  };

  return (
    <>
      <Navbar dashboardTitle={title} changeTitle={changeTitle} />
      <Routes>
        <Route path='/' element={<Choose />} />
        <Route path='/teacher-login' element={<TeacherLogin changeTitle={changeTitle} changeUser={changeUser} />} />
        <Route path='/student-login' element={<StudentLogin changeTitle={changeTitle} changeUser={changeUser} />} />
        <Route path='/student-register' element={<Register changeTitle={changeTitle} />} />
        <Route path='/add-teacher' element={<AddTeacher />} />
        <Route path='/show-teachers-list' element={<ViewTeachers />} />
        <Route path='/teacher-profile' element={<TeacherProfile teacher={teacher} />} />
        <Route path='/approve-registration' element={<ApproveStudents />} />
        <Route path='/create-schedule' element={<Schedule teacher={teacher} />} />
        <Route path='/view-schedule' element={<ViewSchedule teacher={teacher} />} />
        <Route path='/view-appointments' element={<Requests teacher={teacher} />} />
        <Route path='/book-appointment' element={<BookAppointment student={student} />} />
        <Route path='/student-appointment' element={<MyAppointments student={student} />} />
        <Route path='/student-profile' element={<StudentProfile student={student} />} />
        <Route path='/get-appointment' element={<GetAppointment student={student} />} />
        <Route path='/department-list' element={"/"} />
      </Routes>
    </>
  );
};

export default Main;
