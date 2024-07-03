import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = (props) => {
  const adminLinksRef = useRef(null);
  const teacherLinksRef = useRef(null);
  const studentLinksRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const Logout = () => {
    const auth = getAuth();
    signOut(auth);
    props.changeTitle('MAIN');
    window.alert('Logged out successfully');
    setMenuOpen(!menuOpen);
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
        <nav className="navbar-container">
          <div className="left-section">
            <Link className="navbar-title" to="/" onClick={() => {
            setMenuOpen(!menuOpen);
          }}>{props.dashboardTitle} DASHBOARD</Link>
          </div>

          <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
          }}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="right-section">
            <div className="admin-dashboard-links dashboard-links" ref={adminLinksRef} style={{ display: 'none' }}>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/add-teacher" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>Add Teacher</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/show-teachers-list" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>View Teacher's List</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/approve-registration" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>Approve Registration</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/" onClick={Logout}>Logout</NavLink>
                </li>
              </div>
            </div>

            <div className="teacher-dashboard-links dashboard-links" ref={teacherLinksRef} style={{ display: 'none' }}>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/create-schedule" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>Create Schedule</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/view-schedule" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>View Schedule</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/view-appointments" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>Students Requests</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/teacher-profile" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>My Profile</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/" onClick={Logout}>Logout</NavLink>
                </li>
              </div>
            </div>

            <div className="student-dashboard-links dashboard-links" ref={studentLinksRef} style={{ display: 'none' }}>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/book-appointment" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>Book Appointment</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/student-appointment" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>My Appointments</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/student-profile" onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}>My Profile</NavLink>
                </li>
              </div>
              <div className={menuOpen ? "open" : "link-container"}>
                <li>
                  <NavLink className="page-links" to="/" onClick={Logout}>Logout</NavLink>
                </li>
              </div>
            </div>

          </div>
        </nav>
      </nav>
    </section>
  );
};

export default Navbar;
