import React, { useEffect, useState, useCallback } from 'react';
import "./teacher.css";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import MessagePopup from './Message'; // Import the MessagePopup component

const Requests = ({ teacher }) => {
  const [requestList, setRequestList] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getStudentRequestsList = useCallback(async () => {
    try {
      const data = await getDocs(collection(db, "studentRequests"));
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const matchedRequests = filterData.filter((request) => request.teacherID === teacher.teacherID);
      setRequestList(matchedRequests);
    } catch (e) {
      console.log(e);
    }
  }, [teacher.teacherID]);

  useEffect(() => {
    getStudentRequestsList();
  }, [getStudentRequestsList]);

  const updateAppointmentStatus = async (enrollmentID, status) => {
    try {
      const requestToUpdate = requestList.find(request => request.enrollmentID === enrollmentID);
      if (requestToUpdate) {
        const docRef = doc(db, "studentRequests", requestToUpdate.id);
        await updateDoc(docRef, { approved: status === 'approved', status });
        setRequestList(prevRequests =>
          prevRequests.map(request =>
            request.enrollmentID === enrollmentID ? { ...request, approved: status === 'approved', status } : request
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  return (
    <section className='appointment-request-section'>
      <div className='title-container'>
        <p className='title' style={{ marginTop: '1rem' }}>
          Student Appointment Requests
        </p>
      </div>
      <div className="appointment-requests-container tabular-view">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name of Student</th>
              <th scope="col">Student ID</th>
              <th scope="col">Requested Time</th>
              <th scope="col">View Details</th>
              <th scope="col">Appointment Status</th>
              <th scope="col">Appointment Decline</th>
            </tr>
          </thead>
          <tbody>
            {requestList.map((request) => (
              <tr key={request.id}>
                <td>{request.studentName}</td>
                <td>{request.enrollmentID}</td>
                <td>{request.requestedTime}</td>
                <td>
                  <button className='view-btn' onClick={() => handleViewMessage(request.message)}>
                    View
                  </button>
                </td>
                <td>
                  {request.approved ? (
                    <span style={{color:'green', fontWeight:'bold'}}>Approved</span>
                  ) : request.status === 'declined' ? (
                    <span style={{color:'red'}}>Cancelled</span>
                  ) : (
                    <button className='approve-btn' onClick={() => updateAppointmentStatus(request.enrollmentID, 'approved')}>
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  {request.approved ? (
                    <span style={{color:'green'}}>Approved</span>
                  ) : request.status === 'declined' ? (
                    <span style={{color:'red'}}>Cancelled</span>
                  ) : (
                    <button className='delete-btn' onClick={() => updateAppointmentStatus(request.enrollmentID, 'declined')}>
                      Decline
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMessage && <MessagePopup message={selectedMessage} onClose={handleClosePopup} />}
    </section>
  );
};

export default Requests;
