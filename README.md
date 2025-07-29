# QR Attendance System

A web-based QR code attendance system built with Node.js, Express, React, and SQLite.

## Prerequisites
- Node.js (v14 or higher)
- npm

## Setup Instructions

1. **Backend Setup**:
   - Navigate to the `backend` directory: `cd backend`
   - Install dependencies: `npm install`
   - Start the server: `npm start`
   - The backend will run on `http://localhost:5000`

2. **Frontend Setup**:
   - Navigate to the `frontend` directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start the development server: `npm start`
   - The frontend will run on `http://localhost:3000`

3. **Database**:
   - The SQLite database (`attendance.db`) will be created automatically in the project root.
   - QR codes are saved in the `qr_codes` directory.

## Usage
1. **Generate QR Codes**:
   - Use the "Add Attendee" form to input attendee details (Name, Contact No, Email).
   - A QR code will be generated and saved in the `qr_codes` directory.
   - Download the QR code via the provided link.

2. **Scan QR Codes**:
   - Use the QR scanner (accessible via the web app on a mobile device with a camera).
   - Scanning a QR code marks the attendee as "present" with a timestamp.
   - Scanning the same QR code again will display "Already scanned!".

3. **View Attendance**:
   - The attendance table displays all attendance records with names, emails, statuses, and timestamps.

## Notes
- Ensure the browser has camera access for QR scanning.
- The system supports generating 400 QR codes as specified.
- QR codes are uniquely tied to attendees and stored in the database.

## API Endpoints
- `POST /api/attendees`: Create a new attendee and generate a QR code.
- `GET /api/attendees`: Retrieve all attendees.
- `GET /api/attendees/download/:fileName`: Download a specific QR code.
- `POST /api/attendance/mark`: Mark attendance by scanning a QR code.
- `GET /api/attendance`: Retrieve all attendance records.