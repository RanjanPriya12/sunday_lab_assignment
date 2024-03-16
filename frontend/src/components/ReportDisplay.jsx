import React from 'react';
import "./style/style.css";
import { Link } from 'react-router-dom';

const ReportDisplay = ({ reports }) => {
  return (
    <>
      {
        reports?.map(item => (
          <div key={item.id} className='reportSection'>
            <Link className='link' to={`/reports/${item.id}`}>{item.id }. View Pdf Image</Link> 
          </div>
        ))
      }
    </>
  );
};

export default ReportDisplay;
