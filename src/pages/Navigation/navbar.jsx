import React, { useEffect, useRef } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = (props) => {
  const adminLinksRef = useRef(null);
  const teacherLinksRef = useRef(null);
  const studentLinksRef = useRef(null);

  const Logout = () => {
    const auth = getAuth();
    signOut(auth);
    props.changeTitle('MAIN');
    window.alert('Logged out successfully');
  };

  useEffect(() => {
    if (props.dashboardTitle === 'ADMIN') {
      adminLinksRef.current.style.display = 'flex';
      teacherLinksRef.current.style.display = 'none';
      studentLinksRef.current.style.display = 'none';
    } else if (props.dashboardTitle === 'TEACHER') {
      adminLinksRef.current.style.display = 'none';
      teacherLinksRef.current.style.display = 'flex';
      studentLinksRef.current.style.display = 'none';
    } else if (props.dashboardTitle === 'STUDENT') {
      adminLinksRef.current.style.display = 'none';
      teacherLinksRef.current.style.display = 'none';
      studentLinksRef.current.style.display = 'flex';
    } else {
      adminLinksRef.current.style.display = 'none';
      teacherLinksRef.current.style.display = 'none';
      studentLinksRef.current.style.display = 'none';
    }
  }, [props.dashboardTitle]);

  return (
    <section>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="left-section">
            <a className="navbar-title" href="/">{props.dashboardTitle} DASHBOARD</a>
          </div>
          <div className="right-section">
            <div className="admin-dashboard-links dashboard-links" ref={adminLinksRef} style={{ display: 'none' }}>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/add-teacher">Add Teacher</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/show-teachers-list">View Teacher's List</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/approve-registration">Approve Registration</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>
            </div>

            <div className="teacher-dashboard-links dashboard-links" ref={teacherLinksRef} style={{ display: 'none' }}>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/create-schedule">Create Schedule</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/view-schedule">View Schedule</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/view-appointments">Students Requests</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/teacher-profile">My Profile</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>
            </div>

            <div className="student-dashboard-links dashboard-links" ref={studentLinksRef} style={{ display: 'none' }}>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/book-appointment">Book Appointment</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/student-appointment">My Appointments</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/student-profile">My Profile</Link>
                </li>
              </div>
              <div className="link-container">
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
