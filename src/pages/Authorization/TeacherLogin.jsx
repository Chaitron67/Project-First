import React, { useState } from 'react';
import "../auth.css"
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { admin } from '../Admin/adminConfig';
import PasswordResetModalTeacher from './PasswordResetModalTeacher'; // Import the new PasswordResetModalTeacher component

const TeacherLogin = ({ changeTitle, changeUser }) => {
  const [uniqueID, setUniqueID] = useState("");
  const [password, setPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // function for handling the login ID and Pass : 
  const handleLogin = async (e) => {
    e.preventDefault();
    let adminLogin = false;

    // check if for the Admin : 
    admin.forEach((admin) => {
      if (uniqueID === admin.adminID && password === admin.password) {
        window.alert('Login successfully'); // admin successfully logged in 
        changeTitle('ADMIN'); // changing navBar
        navigate('/add-teacher'); // navigating to this route
        adminLogin = true;
      }
    });

    // this will run only if adminLogin value is false
    if (!adminLogin) {
      let idValue = false;
      let passValue = false;

      // retrieving the teacher's list and then checking authenticating the id and password from firestore : 
      const teachersCollectionRef = collection(db, "teachersData");
      try {
        const data = await getDocs(teachersCollectionRef);
        const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // searching for id exists or the pass is correct or not
        filterData.forEach((teacherValue) => {
          if (teacherValue.teacherID === uniqueID) {
            idValue = true;
            if (teacherValue.password === password) {
              passValue = true;
              changeUser(teacherValue, "TEACHER");
              return;
            }
          }
        });
      }
      catch (e) {
        console.log(e);
      }

      // checking if exists then only login : 
      if (idValue && passValue) {
        window.alert('Login successfully'); // alert
        changeTitle('TEACHER'); // change the navBar
        navigate('/create-schedule'); // go to teachers create schedule page
      }
      else {
        document.querySelector('.password-warning').style.display = "flex";

        if (!idValue && !passValue) { // if both are wrong
          document.querySelector('.password-warning').innerHTML = `Invalid ID and Password`;
        }
        else if (!passValue) { // if id doesn't exist
          document.querySelector('.password-warning').innerHTML = `ID Doesn't Exist`;
        }
        else { // id pass is wrong
          document.querySelector('.password-warning').innerHTML = `Incorrect Password`;
        }
      }
    }
  };

  return (
    <section className='main-container'>
      <div className='form-container'>
        <div className='container-title'>
          <h4 className='title'>Login As Teacher</h4>
        </div>
        <form onSubmit={(event) => handleLogin(event)}>
          <div className="sub-containers">
            <label htmlFor="InputID" className="form-label">Teacher ID</label>
            <input type="text" className="form-control" id="InputID" value={uniqueID} onChange={(e) => setUniqueID(e.target.value)} />
          </div>
          <div className="sub-containers">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="password-warning" style={{ marginTop: "1rem", flexWrap: 'wrap', color: 'red' }}></div>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <p className="form-label" style={{marginTop:'1rem', cursor:'pointer'}} onClick={() => setShowResetModal(true)}>Forgot Password?</p>
        </form>
      </div>
      {showResetModal && <PasswordResetModalTeacher onClose={() => setShowResetModal(false)} />}
    </section>
  );
};

export default TeacherLogin;
