import React, { useEffect, useState, useCallback } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const MyAppointments = ({ student, teacher }) => {
  const [myAppointmentList, setMyAppointmentList] = useState([]);

  const getMyAppointmentsList = useCallback(async () => {
    try {
      const data = await getDocs(collection(db, "studentRequests"));
      const filterData = data.docs.map((doc) => ({ ...doc.data() }));
      const matchedRequests = filterData.filter((request) => request.enrollmentID === student.enrollmentID);
      setMyAppointmentList(matchedRequests);
      console.log(matchedRequests);
    } catch (e) {
      console.log(e);
    }
  }, [student.enrollmentID]);

  useEffect(() => {
    getMyAppointmentsList();
  }, [getMyAppointmentsList]);

  return (
    <section className='main-book-appointment-section'>
      <div className="container">
        <div className='title-container'>
          <p className='title' style={{ marginTop: '1rem' }}>
            My Appointments
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
                <th scope="col">Appointment Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {myAppointmentList.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.teacherName}</td>
                  <td>{appointment.teacherDept}</td>
                  <td>{appointment.teacherSubject}</td>
                  <td>{appointment.scheduleDate}</td>
                  <td>{appointment.requestedTime}</td>
                  <td>
                    {appointment.status === 'approved' ? (
                      <span style={{ color: 'green' }}>Approved</span>
                    ) : appointment.status === 'declined' ? (
                      <span style={{ color: 'red' }}>Cancelled</span>
                    ) : (
                      <span style={{ color: 'blue' }}>Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default MyAppointments;
