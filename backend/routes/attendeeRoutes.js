const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendeeController');

router.post('/', attendeeController.createAttendee);
router.get('/', attendeeController.getAllAttendees);
router.get('/download/:fileName', attendeeController.downloadQRCode);

module.exports = router;