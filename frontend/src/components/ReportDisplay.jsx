import React, { useState } from 'react';
import MyPdfComponent from './viewPdf';
import "./style/style.css";


const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

const ReportDisplay = ({ reports }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpenModal = (index) => {
    setIsModalOpen(true);
    setOpenIndex(index);
    console.log(index)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOpenIndex(null);
  };

  return (
    <>
      {
        reports?.map((item,index) => (
          <div key={item.id} className='reportSection'>
            <>
              {
                !isModalOpen && <button onClick={(index)=>handleOpenModal(index)}>View Pdf Image</button>
              }
            </>
            <>
              {
                isModalOpen && <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <MyPdfComponent pdfData={item} />
                </Modal>
              }
            </>
          </div>
        ))
      }
    </>
  );
};

export default ReportDisplay;
