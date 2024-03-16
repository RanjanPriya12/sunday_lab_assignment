import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "./style/style.css";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPdfComponent = ({ pdfData }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfDataUrl, setPdfDataUrl] = useState('');

    useEffect(() => {
        const arrayBuffer = new Uint8Array(pdfData.pdf_data.data).buffer;
        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
        const pdfDataUrl = `data:application/pdf;base64,${base64String}`;
        setPdfDataUrl(pdfDataUrl);
    }, [pdfData]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    return (
        <div className='ImageSection'>
            <div>
                Image Name is {pdfData.image}
            </div>
            <div>
            {pdfDataUrl && (
                <Document
                    file={pdfDataUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            )}
            </div>
        </div>
    );
};

export default MyPdfComponent;
