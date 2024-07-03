import React, { useState } from 'react'
import "./student.css"
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"

const GetAppointment = ({student}) => {
  const [message, setMessage] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState();
  const location = useLocation();
  const { teacher } = location.state || { teacher: 'No message passed' };
  const navigate = useNavigate();

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    const fromTime = `${format(time, 'h:mm aa')}`;
    setFormattedTime(fromTime);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(student);

    try {
      await addDoc(collection(db, "studentRequests"), {
        id: student.id,
        enrollmentID : student.enrollmentID,
        studentName: student.studentName,
        scheduleDate: teacher.scheduleDate,
        requestedTime: formattedTime,
        teacherID: teacher.teacherID,
        teacherName: teacher.teacherName,
        teacherDept: teacher.teacherDept,
        teacherSubject: teacher.teacherSubject,
        message: message,
        status: "pending"
      });

      console.log(teacher.scheduleDate);

      window.alert('Appointment Request Sent');
      navigate('/book-appointment', {state : teacher});
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <section className='main-section-get-appointment'>
      <div className="get-appointment-container">
        <form className='get-appointment-form-container' onSubmit={(e) => handleSubmit(e)}>
          <div className="teachers-details" style={{ display: 'flex', justifyContent: 'center' }}>
            <span className='inner-title'>TEACHER DETAILS</span>
          </div>
          <div className="row-container">
            <div className="teacher-name-container sub-container">
              <span className='detail-title'>Teacher Name</span>
              <span className='detail-value'>{teacher.teacherName}</span>
            </div>
            <div className="teacher-dept-container sub-container">
              <span className='detail-title'>Department Name</span>
              <span className='detail-value'>{teacher.teacherDept}</span>
            </div>
          </div>
          <div className="row-container">
            <div className="teacher-subject-container sub-container">
              <span className='detail-title'>Subject Name</span>
              <span className='detail-value'>{teacher.teacherSubject}</span>
            </div>
            <div className="data-appointment sub-container">
              <span className='detail-title'>Appointment Date</span>
              <span className='detail-value'>{teacher.scheduleDate}</span>
            </div>
          </div>
          <div className="row-container">
            <div className="From-Time sub-container">
              <span className='detail-title'>Available FromTime</span>
              <span className='detail-value'>{teacher.scheduleFromTime}</span>
            </div>
            <div className="To-Time sub-container">
              <span className='detail-title'>Available To Time</span>
              <span className='detail-value'>{teacher.scheduleToTime}</span>
            </div>
          </div>
          <div className="row-container3">
            <div className="From-Time sub-container">
              <label className='detail-title' >Set Appointment Time</label>
              <div style={{ marginTop: '0.2rem' }}>
                <DatePicker
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>
          <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label for="exampleFormControlTextarea1" class="form-label"><span className='detail-title'>Send Message</span></label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{ boxShadow: '0.1rem 0.1rem 0.2rem 0.2rem gray' }} placeholder='Write a message to teacher...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <button type="submit" className="submit-appointment-btn">Send Requests</button>
        </form>

      </div>
    </section>
  )
}

export default GetAppointment