import React, { useEffect, useState } from 'react';
import ImageCapture from './ImageCapture';
import LoadingAnimation from './LoadingAnimation';
import ReportDisplay from './ReportDisplay';
import axios from 'axios';

const Home = () => {
    const cropList = ["Rice", "Wheat", "Pulses", "SugarCane", "OilSeeds"]
    const [selectedCrop, setSelectedCrop] = useState("");
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [clicked, setCliecked] = useState(false);

    const handleCropSelection = (event) => {
        setSelectedCrop(event.target.value);
    };

    const fetchReports = async () => {
        const val = await axios.get(`http://localhost:5000/crops/api/v1/reports`);
        setReportData(val.data.result);
    }
    const handleImageCapture = async (data) => {
        setLoading(true);
        const timestamp = new Date().getTime();
        const imageName = `captured_${selectedCrop}_image_${timestamp}.jpeg`;
        await axios.post(`http://localhost:5000/crops/api/v1/image`, {
            title: imageName,
            image: data
        });
        setLoading(false);
        setCliecked(!clicked);
    };

    useEffect(() => {
        fetchReports();
    }, [clicked])

    return (
        <div className='mainConatiner'>
            <h3>Select Crop</h3>
            <select onChange={handleCropSelection} value={selectedCrop}>
                <option value="">Select Crop</option>
                {
                    cropList?.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </select>
            <ImageCapture onCapture={handleImageCapture} />
            {loading ? (
                <LoadingAnimation />
            ) : (
                reportData && <ReportDisplay reports={reportData} />
            )}
        </div>
    );
};

export default Home;
