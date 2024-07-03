import React, { useEffect, useState, useCallback } from 'react';
import "./student.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from 'react-router-dom';

const BookAppointment = (props) => {
  const [teachersData, setTeachersData] = useState([]);
  const navigate = useNavigate();

  const getTeacherList = useCallback(async () => {
    try {
      const data = await getDocs(collection(db, "scheduleData"));
      const filterData = data.docs.map(doc => ({ ...doc.data() }));
      setTeachersData([...filterData]);
      console.log(filterData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getTeacherList(); // rerendering
  }, [getTeacherList]);

  const getAppointment = async (teacher) => {
    navigate('/get-appointment', { state: { teacher } });
  }

  return (
    <section className='main-book-appointment-section'>
      <div className="container">
        <div className='title-container'>
          <p className='title' style={{ marginTop: '1rem' }}>
            Get Teacher's Appointment
          </p>
        </div>
        <div className="book-teacher-container tabular-view">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name of Teacher</th>
                <th scope="col">Department</th>
                <th scope="col">Subject</th>
                <th scope="col">Date</th>
                <th scope="col">Available From</th>
                <th scope="col">Available To</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher, index) => (
                <tr key={index}>
                  <td>{teacher.teacherName}</td>
                  <td>{teacher.teacherDept}</td>
                  <td>{teacher.teacherSubject}</td>
                  <td>{teacher.scheduleDate}</td>
                  <td>{teacher.scheduleFromTime}</td>
                  <td>{teacher.scheduleToTime}</td>
                  <td>
                    <button className='get-appointment-btn' onClick={() => getAppointment(teacher)}>Get Appointment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default BookAppointment;
