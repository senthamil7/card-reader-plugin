import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { recognize } from 'tesseract.js';
import './App.css';

const Modal = ({ closeModal }) => {
  const webcamRef = useRef(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await processImage(imageSrc);
  };

  const processImage = async (imageSrc) => {
    const result = await recognize(imageSrc, 'eng');
    let res = result.data.text.replace(/(\r\n|\n)/gm, '');
    let formattedRes = res.replace(/[^0-9 /]/g, '');
    let cardNumberArray = formattedRes.split(' ');
    const reg = /^\d+$/;

    let cardNumber = '';
    cardNumberArray.forEach((item) => {
      if (item && item !== 0 && (item.length === 4 || item.length === 8) && reg.test(item)) {
        cardNumber += item;
      }
    });

    closeModal(cardNumber);
  };

  return (
    <div className="modal open">
      <div className="modal-content">
        <h1>Card Reader</h1>
        <div className="overlay">
          <div className="overlay-helper">
            <div className="overlay-element top-left"></div>
            <div className="overlay-element bottom-right"></div>
          </div>
        </div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            height: '400px',
            width: '700px',
            objectFit: 'fill',
          }}
        />
        <div className="button">
          <button onClick={captureImage}>Capture it!</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;