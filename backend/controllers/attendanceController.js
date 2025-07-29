const db = require('../config/database');

exports.markAttendance = (req, res) => {
  const { qr_code } = req.body;

  db.get(`SELECT id FROM attendees WHERE qr_code = ?`, [qr_code], (err, attendee) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!attendee) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    db.get(
      `SELECT * FROM attendance WHERE attendee_id = ? AND status = 'present'`,
      [attendee.id],
      (err, attendance) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (attendance) {
          return res.status(400).json({ message: 'Already scanned!' });
        }

        db.run(
          `INSERT INTO attendance (attendee_id, status) VALUES (?, 'present')`,
          [attendee.id],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            db.get(
              `SELECT a.*, t.name, t.email FROM attendance a JOIN attendees t ON a.attendee_id = t.id WHERE a.id = ?`,
              [this.lastID],
              (err, row) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
                res.json(row);
              }
            );
          }
        );
      }
    );
  });
};

exports.getAttendance = (req, res) => {
  db.all(
    `SELECT a.*, t.name, t.email FROM attendance a JOIN attendees t ON a.attendee_id = t.id`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
};