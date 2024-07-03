import React, { useState } from 'react';
import "../auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore"
import { db } from "../../firebase"

const StudentLogin = (props) => {

  const [enrollmentID, setEnrollmentID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let enrollmentIDValue = false;
    let passValue = false;
    let notApproved = false;

    // checking if the input enrollment ID is exists or not in db
    const studentsCollectionRef = collection(db, "approvedStudentsData");
    try {
      const data = await getDocs(studentsCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      filterData.forEach((student) => {
        if (student.enrollmentID === enrollmentID) {
          enrollmentIDValue = true;
          if (student.password === password) {
            passValue = true;
            props.changeUser(student ,"STUDENT");
          }
          return;
        }
      })
    }
    catch (e) {
      console.log(e);
    }

    // if not exist in approvedStudents db then check in not approved list of db 
    if (!enrollmentIDValue) {
      const studentsCollectionRef = collection(db, "studentsData");
      try {
        const data = await getDocs(studentsCollectionRef);
        const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        // console.log(filterData);

        filterData.forEach((student) => {
          if (student.enrollmentID === enrollmentID) {
            notApproved = true;
            return;
          }
        })
      }
      catch (e) {
        console.log(e);
      }
    }

    /// for checking if exists or not then only login : 
    if (enrollmentIDValue && passValue) {
      window.alert('Login successfully');
      props.changeTitle('STUDENT');
      navigate('/book-appointment')
    }
    else {
      document.querySelector('.password-warning').style.display = "flex";
      if (notApproved) {
        document.querySelector('.password-warning').innerHTML = `You are not approved yet`;
      }
      else if (!enrollmentIDValue) {
        document.querySelector('.password-warning').innerHTML = `Enrollment ID Doesn't Exists`;
      }
      else if (!enrollmentIDValue) {
        document.querySelector('.password-warning').innerHTML = `Incorrect Password`;
      }
      else {
        document.querySelector('.password-warning').innerHTML = `Invalid Enrollment ID and Password`;
      }
    }
  }

  return (
    <section className='main-container'>
      <div className='form-container'>
        <div className='container-title'>
          <h4 className='title'>Login As Student</h4>
        </div>
        <form autoComplete="off" onSubmit={(e) => handleLogin(e)}>
          <div className="sub-containers">
            <label for="enrollmentIDInput" className="form-label">Student Enrollment ID</label>
            <input type="text" className="form-control" id="enrollmentIDInput" autoComplete="off" onChange={(e) => setEnrollmentID(e.target.value)} />
          </div>
          <div className="sub-containers">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            <div className="password-warning" style={{ marginTop: "1rem", display: "none", flexWrap: 'wrap', color: 'red' }}></div>
          </div>
          <div className='do-register'>
            <Link className="register-here" to="/student-register">Don't have an account</Link>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </section>
  )
}

export default StudentLogin