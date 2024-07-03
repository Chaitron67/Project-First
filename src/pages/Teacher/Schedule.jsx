import React, { useState } from 'react'
import "./teacher.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"

const Schedule = ({ teacher }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedFromTime, setFormattedFromTime] = useState('');
  const [formattedToTime, setFormattedToTime] = useState('');

  // handles the Date : 
  const handleDateChange = (date) => {
    try {
      setStartDate(date);
      const Date = `${format(date, 'dd/MM/yyyy')}`;
      setFormattedDate(Date); // this is set to pass date in specific format in db
    }
    catch (e) {
      console.log(e);
    }
  };

  // handles the To Time : 
  const handleFromTimeChange = (time) => {
    try {
      setSelectedFromTime(time);
      const fromTime = `${format(time, 'h:mm aa')}`;
      setFormattedFromTime(fromTime); // this is set to pass date in specific format in db
    }
    catch (e) {
      console.log(e);
    }
  };

  // handles the From Time : 
  const handleToTimeChange = (time) => {
    try {
      setSelectedToTime(time);
      const toTime = `${format(time, 'h:mm aa')}`;
      setFormattedToTime(toTime); // this is set to pass date in specific format in db
    }
    catch (e) {
      console.log(e);
    }
  };

  // save the schedule of the teacher : 
  const saveSchedule = async (e) => {
    e.preventDefault();

    try {
      // adding the schedule data to db with the id as existing teacher id : 
      await setDoc(doc(db, "scheduleData", teacher.teacherID), {
        id: teacher.id,
        teacherName : teacher.teacherName,
        teacherDept : teacher.department,
        teacherSubject : teacher.subject,
        teacherID: teacher.teacherID,
        scheduleDate: formattedDate,
        scheduleFromTime: formattedFromTime,
        scheduleToTime: formattedToTime,
      });

      // as here we use the id as teacher.id so if we create new schedule then previous will be updated as each teacher will only have one teacher.id so schedule will be updated automatically. 

      window.alert('Schedule Set');
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='schedule-appointment-container'>

      <div className='title-container'>
        <p className='title'>
          Create Appointment Schedule
        </p>
      </div>
      <div className='main-schedule-container'>
        <form className='form-container' onSubmit={(e) => saveSchedule(e)}>
          <div className="schedule-container-fields">
            <div className="date each-container">
              <label className='field-label'>Schedule Date</label>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </div>
            <div className="time-from each-container">
              <label className='field-label'>From Time</label>
              <DatePicker
                selected={selectedFromTime}
                onChange={handleFromTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="From Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="time-to each-container">
              <label className='field-label'>To Time</label>
              <DatePicker
                selected={selectedToTime}
                onChange={handleToTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="To Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="submit-btn">SUBMIT</button>
          </div>
        </form>
      </div>


    </div>
  )
}

export default Schedule