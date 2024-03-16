import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import "./style/style.css";

const ImageCapture = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
        setShowCamera(false);
    };



    return (
        <div className='imageCaptureContainer'>
            <div>
                {
                    !showCamera && <button onClick={() => setShowCamera(true)}>Open Camera</button>
                }
            </div>

            <div>
                {showCamera && 
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                        <button onClick={capture}>Capture</button>
                    </>
                }
            </div>
        </div>
    );
};

export default ImageCapture;
