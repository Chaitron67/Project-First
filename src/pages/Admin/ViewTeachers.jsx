import React, { useEffect, useState } from 'react';
import './admin.css';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import UpdateTeacherModal from './UpdateTeacherModal';

const ViewTeachers = () => {
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const teachersCollectionRef = collection(db, 'teachersData');

  const getTeacherList = async () => {
    try {
      const data = await getDocs(teachersCollectionRef);
      const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTeacherList(filterData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTeacherList();
  }, []);

  const handleUpdateClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedTeacher(null);
    setShowModal(false);
  };

  const handleUpdateSuccess = () => {
    getTeacherList();
  };

  const deleteTeacher = async (ID) => {
    try {
      await deleteDoc(doc(db, 'teachersData', ID));
      getTeacherList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="view-teacher-list-section">
      <div className="title-container">
        <p className="title" style={{ marginTop: '1rem' }}>
          Teacher's List
        </p>
      </div>
      <div className="view-teacher-list-container tabular-view">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Teacher ID</th>
              <th scope="col">Name of Teacher</th>
              <th scope="col">Department</th>
              <th scope="col">Subject</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {teacherList.map((teacher) => (
              <tr key={teacher.id}>
                <th scope="row">{teacher.teacherID}</th>
                <td>{teacher.teacherName}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subject}</td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdateClick(teacher)}>Update</button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTeacher(teacher.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <UpdateTeacherModal
          teacher={selectedTeacher}
          onClose={handleModalClose}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </section>
  );
};

export default ViewTeachers;
