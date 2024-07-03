import React from 'react'
import "./Choose.css"
import Navbar from '../Navigation/navbar'
import { useNavigate } from 'react-router-dom'


const Choose = () => {
  const navigate = useNavigate();

  function goToStudentLogin() {
    navigate('/student-login')
  }

  function goToStudentSignUp() {
    navigate('/student-register')
  }

  function goToTeacherLogin() {
    navigate('/teacher-login')
  }

  return (

    <section>
      <div className="main-choose-section">
        <div className='choose-btn-container'>
          <div className="choose-option-title">
            <p>MAIN DASHBOARD</p>
          </div>
          <div className='btn-container'>
            <button className='choose-btn' onClick={goToTeacherLogin}>
              <span>Login as Teacher</span>
            </button>
          </div>
          <div>
            <button className='choose-btn' onClick={goToStudentLogin}>
              <span>Login as Student</span>
            </button>
          </div>
          <div>
            <button className='choose-btn' onClick={goToStudentSignUp}>
              <span>Register as Student</span>
            </button>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Choose