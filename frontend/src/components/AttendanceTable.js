import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        setAttendance(response.data);
      } catch (err) {
        console.error('Error fetching attendance:', err);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Attendance Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(record => (
            <tr key={record.id}>
              <td className="p-2">{record.name}</td>
              <td className="p-2">{record.email}</td>
              <td className="p-2">{record.status}</td>
              <td className="p-2">{record.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;