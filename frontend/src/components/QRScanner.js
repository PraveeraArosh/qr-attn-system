import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import axios from 'axios';

const QRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.play();
        scanQRCode();
      } catch (err) {
        setMessage('Error accessing camera: ' + err.message);
      }
    };

    const scanQRCode = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          axios.post('http://localhost:5000/api/attendance/mark', { qr_code: code.data })
            .then(response => setMessage('Attendance marked for ' + response.data.name))
            .catch(err => setMessage(err.response?.data?.message || err.response?.data?.error || err.message));
        }
      }
      requestAnimationFrame(scanQRCode);
    };

    startScanner();

    return () => {
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Scan QR Code</h2>
      <video ref={videoRef} className="w-full" />
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default QRScanner;