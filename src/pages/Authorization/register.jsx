import React, { useState } from 'react';
import "../auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"


const Register = (props) => {

  const [name, setName] = useState("");
  const [enrollmentID, setEnrollmentID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let enrollmentIdExists = false;
    let notApproved = false;

    // this is for checking if the input enrollmentID already exists or not in approvedStudentsData db : 
    const approvedStudentsCollectionRef = collection(db, "approvedStudentsData");
    try {
      const data = await getDocs(studentsCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(filterData);

      filterData.forEach((student) => {
        if (student.enrollmentID === enrollmentID) {
          // console.log(enrollmentIdExists)
          enrollmentIdExists = true;
          return;
        }
      })
    }
    catch (e) {
      console.log(e);
    }

    // this is for checking if the input enrollmentID already exists or not in studentsData means not approved : 
    const studentsCollectionRef = collection(db, "studentsData");
    try {
      const data = await getDocs(studentsCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(filterData);

      filterData.forEach((student) => {
        if (student.enrollmentID === enrollmentID) {
          // console.log(enrollmentIdExists)
          notApproved = true;
          return;
        }
      })
    }
    catch (e) {
      console.log(e);
    }

    if (enrollmentIdExists) {
      document.querySelector('.password-warning').style.display = "flex";
      document.querySelector('.password-warning').innerHTML = "Enrollment ID already exists";
    }
    else if (notApproved) {
      document.querySelector('.password-warning').style.display = "flex";
      document.querySelector('.password-warning').innerHTML = "Enrollment ID already exists";
    }
    else if (!enrollmentIdExists && !notApproved) {
      try {
        await addDoc(collection(db, "studentsData"), {
          studentName: name,
          enrollmentID: enrollmentID,
          password: password,
          approved: false
        });
        window.alert("You have Registered, wait for the Admin approval");
        props.changeTitle('MAIN');
        navigate('/');
      }
      catch (e) {
        console.log(e);
      }
    }



  }

  return (
    <>
      <section className='main-container'>
        <div className='form-container'>
          <div className='container-title'>
            <h4 className='title'>Register Here</h4>
          </div>
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="sub-containers">
              <label for="nameInput" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="nameInput" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="sub-containers">
              <label for="enrollmentIDInput" className="form-label">Student Enrollment ID</label>
              <input type="text" className="form-control" id="enrollmentIDInput" onChange={(e) => setEnrollmentID(e.target.value)} />
            </div>
            <div className="sub-containers">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
              {/* <div id="passwordHelpBlock" class="form-text">
                Your password must be 8-20 characters long.
              </div> */}
              <div className="password-warning" style={{ marginTop: "1rem", display: "none", flexWrap: 'wrap', color: 'red' }}></div>
            </div>
            <div className='do-login'>
              <Link className="login-here" to="/student-login">Already have an account</Link>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>

          </form>
        </div>
      </section>
    </>
  )
}

export default Register