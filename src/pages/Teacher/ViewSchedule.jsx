import React, { useEffect, useState, useCallback } from 'react';
import './teacher.css';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ViewSchedule = ({ teacher }) => {
  const [teacherSchedule, setTeacherSchedule] = useState(null);

  const getTeacherSchedule = useCallback(async () => {
    try {
      const docRef = doc(db, 'scheduleData', teacher.teacherID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTeacherSchedule(docSnap.data());
      } else {
        setTeacherSchedule(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, [teacher.teacherID]);

  useEffect(() => {
    getTeacherSchedule();
  }, [getTeacherSchedule]);

  const deleteSchedule = async (ID) => {
    try {
      await deleteDoc(doc(db, 'scheduleData', ID));
      getTeacherSchedule();
      setTeacherSchedule(null);
      window.alert('Deleted');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className='view-schedule-section'>
      <div className='title-container'>
        <p className='title' style={{ marginTop: '1rem' }}>
          My Schedule
        </p>
      </div>
      <div className="view-schedule-container tabular-view">
        <table className="table">
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
            {teacherSchedule ? (
              <tr>
                <th scope="row">{teacherSchedule.teacherID}</th>
                <td>{teacherSchedule.scheduleDate}</td>
                <td>{teacherSchedule.scheduleFromTime}</td>
                <td>{teacherSchedule.scheduleToTime}</td>
                <td>
                  <button className='delete-btn' onClick={() => deleteSchedule(teacherSchedule.teacherID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No schedule set, please set the Schedule</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewSchedule;
