import React, { useEffect, useState } from 'react'
import "./teacher.css"
import { getDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"

const ViewSchedule = ({ teacher }) => {
  // state variable for modifying schedule : 
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  // to get schedule list at realtime : 
  const getTeacherSchedule = async () => {
    try {
      const docRef = doc(db, "scheduleData", teacher.teacherID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTeacherSchedule(docSnap.data())
        console.log(teacherSchedule);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setTeacherSchedule(null);

      }
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTeacherSchedule();
  }, [getTeacherSchedule]);


  // onClick of the delete button : 
  const deleteSchedule = async (ID) => {
    try {
      await deleteDoc(doc(db, "scheduleData", ID));
      getTeacherSchedule();
      setTeacherSchedule(null);
      window.alert('deleted')
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <section className='view-schedule-section'>
      <div className='title-container'>
        <p className='title' style={{ marginTop: '1rem' }}>
          My Schedule
        </p>
      </div>
      <div className="view-schedule-container tabular-view">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date of Schedule</th>
              <th scope="col">From Time</th>
              <th scope="col">To Time</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              teacherSchedule ?
                <tr>
                  <th scope="row">{teacherSchedule.teacherID}</th>
                  <td>{teacherSchedule.scheduleDate}</td>
                  <td>{teacherSchedule.scheduleFromTime}</td>
                  <td>{teacherSchedule.scheduleToTime}</td>
                  <td><button className='delete-btn' onClick={() => deleteSchedule(teacherSchedule.teacherID)}>Delete</button></td>
                </tr>
                :
                  `No schedule set, please set the Schedule`
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ViewSchedule