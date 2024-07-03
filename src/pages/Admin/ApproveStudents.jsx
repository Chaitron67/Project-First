import React, { useEffect, useState } from 'react'
import { getDocs, collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"

const ApproveStudents = () => {
  // state variable for modifying teachersList : 
  const [studentList, setStudentList] = useState([]);

  // to get teachers list at realtime : 
  const getStudentList = async () => {
    // collection reference passed to get docs using getDocs() function :
    const studentsCollectionRef = collection(db, "studentsData");
    try {
      const data = await getDocs(studentsCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(filterData);
      setStudentList(filterData);
    }
    catch (e) {
      console.log(e);
    }
  }

  // after every refresh it will display the teacher's list
  useEffect(() => {
    getStudentList() // rerendering
  }, [getStudentList]);

  const approveStudent = async (ID) => {
    const studentRef = doc(db, "studentsData", ID);
    try {
      await updateDoc(studentRef, {
        approved: true
      });
      window.alert('approved')
      getStudentList(); // rerendering
    }
    catch (e) {
      console.log(e);
    }
  }

  const addApproveStudent = async (student) => {
    try {
      await addDoc(collection(db, "approvedStudentsData"), {
        studentName: student.studentName,
        enrollmentID: student.enrollmentID,
        password: student.password,
        approved: true
      });
      console.log('Student approved and added to db')
    }
    catch (e) {
      console.log(e);
    }
  }

  const declineStudent = async (ID) => {
    try {
      await deleteDoc(doc(db, "studentsData", ID));
      getStudentList(); // rerendering
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <section className='approve-student-section'>
      <div className='title-container'>
        <p className='title' style={{ marginTop: '1rem' }}>
          Approve Student Registration
        </p>
      </div>
      <div className="approve-student-container tabular-view">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Enrollment ID</th>
              <th scope="col">Name of Student</th>
              <th scope="col">Approve</th>
              <th scope="col">Decline</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr>
                <th scope="row">{student.enrollmentID}</th>
                <td>{student.studentName}</td>
                <td><button className='approve-btn' onClick={() => { approveStudent(student.id); addApproveStudent(student); declineStudent(student.id); }}>Approve</button></td>
                <td><button className='delete-btn' onClick={() => declineStudent(student.id)}>Decline</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ApproveStudents
