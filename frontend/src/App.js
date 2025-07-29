import React from 'react';
import './App.css';
import AttendeeForm from './components/AttendeeForm';
import QRScanner from './components/QRScanner';
import AttendanceTable from './components/AttendanceTable';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">QR Attendance System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AttendeeForm />
        <QRScanner />
      </div>
      <AttendanceTable />
    </div>
  );
}

export default App;