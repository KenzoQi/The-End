import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faChartLine, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = ({ auth }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [editEnrollment, setEditEnrollment] = useState(null);
  const [viewingStatistics, setViewingStatistics] = useState(false);
  const [studentsActive, setStudentsActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/api/enrollments');
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const navigateToEnrollment = () => {
    window.location.href = '/dashboard/enrollment';
  };

  const navigateToReview = () => {
    window.location.href = '/dashboard/enrollment/review';
  };

  const navigateToEnrollmentStatus = () => {
    window.location.href = '/status';
  };

  const navigateToStatistics = () => {
    window.location.href = '/dashboard/statistics';
    setViewingStatistics(true);
  };

  const navigateToStaffDashboard = () => {
    window.location.href = '/staffdashboard';
    setStudentsActive(true);
  };

  const handleEditClick = (enrollment) => {
    setEditEnrollment(enrollment);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditEnrollment({
      ...editEnrollment,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/enrollment-forms/${editEnrollment.id}`, editEnrollment);
      alert('Enrollment data updated successfully');
      fetchEnrollments();
      setEditEnrollment(null);
    } catch (error) {
      console.error('Error updating enrollment data:', error);
      alert('There was an error updating the enrollment data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/enrollment-forms/${id}`);
      alert('Enrollment data deleted successfully');
      fetchEnrollments();
    } catch (error) {
      console.error('Error deleting enrollment data:', error);
      alert('There was an error deleting the enrollment data');
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="flex" style={{ backgroundImage: "url('https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2024/03/11/4cdb4fbc-c448-4af5-bb6e-ffdf677548c6_e1a83bec.jpg?itok=4Pa3Dk7Q&v=1710134844')", backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <div className={`w-64 bg-green-700 min-h-screen text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="sticky top-0 p-6">
            <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
            <nav>
              <ul>
                <li className="mb-2">
                  <button
                    className={`flex items-center text-lg p-2 rounded hover:bg-green-700 w-full text-left ${activeItem === 'Statistics' ? 'bg-green-900' : ''}`}
                    onClick={() => {
                      setActiveItem('Statistics');
                      navigateToStatistics();
                    }}
                  >
  
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    className={`flex items-center text-lg p-2 rounded hover:bg-green-700 w-full text-left ${activeItem === 'EnrollmentProcess' ? 'bg-green-900' : ''}`}
                    onClick={() => {
                      setActiveItem('EnrollmentProcess');
                      navigateToEnrollment();
                    }}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                    Enrollment Process
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    className={`flex items-center text-lg p-2 rounded hover:bg-green-700 w-full text-left ${activeItem === 'EnrollmentReview' ? 'bg-green-900' : ''}`}
                    onClick={() => {
                      setActiveItem('EnrollmentReview');
                      navigateToReview();
                    }}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                    Enrollment Review
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    className={`flex items-center text-lg p-2 rounded hover:bg-green-700 w-full text-left ${activeItem === 'EnrollmentStatus' ? 'bg-green-900' : ''}`}
                    onClick={() => {
                      setActiveItem('EnrollmentStatus');
                      navigateToEnrollmentStatus();
                    }}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                    Enrollment Status
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    className={` flex items-center text-lg p-2 rounded hover:bg-green-700 w-full text-left  ${studentsActive ? 'bg-green-900' : ''}`}
                    onClick={navigateToStaffDashboard}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                    Students
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex-1 md:ml-64 p-6">
          <button
            className="block md:hidden text-gray-800 hover:text-gray-600 focus:outline-none mb-4"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight hidden">Dashboard</h2>
            <div className="text-sm text-gray-600 hidden">Current Session: 2024</div>
          </div>

          <div>
            <h1 className="text-lg font-semibold mb-2 hidden">Thank You For Logging In</h1>
            <ul className="divide-y divide-gray-200">
              {enrollments.length === 0 ? (
                <div className="text-center">
                  <img
                    src="https://www.shutterstock.com/image-photo/having-best-time-friends-top-600nw-494939341.jpg"
                    alt="No enrollments available"
                    className="img-fluid hidden"
                  />
                </div>
              ) : (
                enrollments.map((enrollment, index) => (
                  <li key={index} className="py-2">
                    <div>
                      <p className="text-lg font-medium text-gray-800">Term: {enrollment.term}</p>
                      <p className="text-sm text-gray-500">Application Type: {enrollment.applicationType}</p>
                      <p className="text-sm text-gray-500">Academic Program: {enrollment.course}</p>
                      <p className="text-sm text-gray-500">Department: {enrollment.department}</p>
                      <p className="text-sm text-gray-500">Year: {enrollment.year}</p>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEditClick(enrollment)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline ml-4"
                        onClick={() => handleDelete(enrollment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {editEnrollment && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Edit Enrollment Form</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Academic Year & Term</label>
                  <input
                    type="text"
                    name="term"
                    value={editEnrollment.term}
                    onChange={handleUpdateChange}
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Application Type</label>
                  <input
                    type="text"
                    name="applicationType"
                    value={editEnrollment.applicationType}
                    onChange={handleUpdateChange}
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">First Choice Academic Program</label>
                  <input
                    type="text"
                    name="course"
                    value={editEnrollment.course}
                    onChange={handleUpdateChange}
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={editEnrollment.department}
                    onChange={handleUpdateChange}
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={editEnrollment.year}
                    onChange={handleUpdateChange}
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
                <button
                  type="button"
                  className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={() => setEditEnrollment(null)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
