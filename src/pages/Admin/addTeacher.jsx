import React, { useState } from 'react'
import "./admin.css"
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"

const AddTeacher = () => {
  const [teacherID, setTeacherID] = useState();
  const [teacherName, setTeacherName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [subject, setSubject] = useState("");

  // logic for adding the teacher's details through admin
  const addTeacher = async (e) => {
    e.preventDefault();
    let idValue = false;

    // this is for checking if the input id already exists or not : 
    const teachersCollectionRef = collection(db, "teachersData");
    try {
      const data = await getDocs(teachersCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      filterData.forEach((teacherValue) => {
        if (teacherValue.teacherID === teacherID) {
          console.log(idValue)
          idValue = true;
          return;
        }
      })
    }
    catch (e) {
      console.log(e);
    }

    console.log(idValue)


    if (idValue) {
      document.querySelector('.password-warning').style.display = "flex";
      if (idValue) {
        document.querySelector('.password-warning').innerHTML = `ID Already Exists`;
      }
    }
    else {
      document.querySelector('.password-warning').style.display = "none";
      
      // ------ Adding the teacher's data from here -------
      try {
        await addDoc(collection(db, "teachersData"), {
          teacherName: teacherName,
          teacherID: teacherID,
          password: teacherID, // Initially password and ID will be same in future the user can do change the password
          department: deptName,
          subject: subject
        });
        window.alert("Teacher Information Added");
        // window.location.reload();

      }
      catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <section className="add-teacher-section">
      <div className="add-teacher-container">
        <div className='title-container'>
          <p className='title'>
            Add Teacher
          </p>
        </div>
        <form onSubmit={(event) => addTeacher(event)}>
          <div className="sub-containers">
            <label for="IDInput" className="form-label">Teacher ID</label>
            <input type="text" className="form-control" id="IDInput" value={teacherID} placeholder='Teacher ID' onChange={(e) => setTeacherID(e.target.value)} />
            <div className="password-warning" style={{ margin: "0.5rem 0 0 0", flexWrap: 'wrap', color: 'red' }}></div>
          </div>
          <div className="sub-containers">
            <label for="nameInput" className="form-label">Teacher Name</label>
            <input type="text" className="form-control" id="nameInput" value={teacherName} placeholder='Teacher Name' onChange={(e) => setTeacherName(e.target.value)} />
          </div>
          <div className="sub-containers">
            <label htmlFor="departmentInput" className="form-label">Department Name</label>
            <select className="form-control" id="departmentInput" value={deptName} onChange={(e) => setDeptName(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
            </select>
          </div>
          <div className="sub-containers">
            <label for="subjectsInput" className="form-label">Subject</label>
            <input type="text" className="form-control" id="subjectsInput" value={subject} placeholder='Subject Name' onChange={(e) => setSubject(e.target.value)} />

          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </section>

  )
}

export default AddTeacher