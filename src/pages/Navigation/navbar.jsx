import React, { useEffect } from 'react';
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const Navbar = (props) => {

  function Logout() {
    const auth = getAuth()
    signOut(auth);
    props.changeTitle('MAIN');
    window.alert('Log out Successfully')
  }

  useEffect(() => {
    if (props.dashboardTitle === "ADMIN") {
      document.querySelector('.admin-dashboard-links').style.display = 'flex';
      document.querySelector('.teacher-dashboard-links').style.display = 'none';
      document.querySelector('.student-dashboard-links').style.display = 'none';
    }
    else if (props.dashboardTitle === "TEACHER") {
      document.querySelector('.admin-dashboard-links').style.display = 'none';
      document.querySelector('.teacher-dashboard-links').style.display = 'flex';
      document.querySelector('.student-dashboard-links').style.display = 'none';
    }
    else if (props.dashboardTitle === "STUDENT") {
      document.querySelector('.admin-dashboard-links').style.display = 'none';
      document.querySelector('.teacher-dashboard-links').style.display = 'none';
      document.querySelector('.student-dashboard-links').style.display = 'flex';
    }
    else if (props.dashboardTitle === "MAIN") {
      document.querySelector('.admin-dashboard-links').style.display = 'none';
      document.querySelector('.teacher-dashboard-links').style.display = 'none';
      document.querySelector('.student-dashboard-links').style.display = 'none';
    }

  }, [props.dashboardTitle]);

  return (
    <section>
      <nav class="navbar">
        <div class="navbar-container">
          <div className="left-section">
            <a className='navbar-title'>{props.dashboardTitle} DASHBOARD</a>
          </div>
          <div className="right-section">
            <div className='admin-dashboard-links dashboard-links' style={{ display: 'none' }}>
              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/add-teacher">Add Teacher</Link>
                </li>
              </div>
              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/show-teachers-list">View Teacher's List</Link>
                </li>
              </div>
              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/approve-registration">Approve Registration</Link>
                </li>
              </div>
              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>
            </div>

            <div className='teacher-dashboard-links dashboard-links' style={{ display: 'none' }}>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/create-schedule">Create Schedule</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/view schedule">View Schedule</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/view-appointments">Students Requests</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/teacher-profile">My Profile</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>

            </div>

            <div className='student-dashboard-links dashboard-links' style={{ display: 'none' }}>
              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/book-appointment">Book Appointment</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/student-appointment">My Appointments</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/student-profile">My Profile</Link>
                </li>
              </div>

              <div className='link-container'>
                <li>
                  <Link className="page-links" to="/" onClick={Logout}>Logout</Link>
                </li>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Navbar