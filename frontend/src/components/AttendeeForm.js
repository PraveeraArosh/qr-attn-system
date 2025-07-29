import React, { useState } from 'react';
import axios from 'axios';

const AttendeeForm = () => {
  const [formData, setFormData] = useState({ name: '', contact_no: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/attendees', formData);
      setMessage(`Attendee added! QR Code: ${response.data.qr_code_path}`);
      setFormData({ name: '', contact_no: '', email: '' });
    } catch (err) {
      setMessage('Error adding attendee: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Add Attendee</h2>
      <div>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Contact No</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Generate QR Code
        </button>
      </div>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default AttendeeForm;