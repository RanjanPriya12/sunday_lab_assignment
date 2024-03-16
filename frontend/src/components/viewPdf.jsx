import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "./style/style.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyPdfComponent = () => {
    const [report, setReport] = useState({});
    const { id } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfDataUrl, setPdfDataUrl] = useState('');

    const getReport = () => {
        axios
            .get(`http://localhost:5000/crops/api/v1/reports/${id}`)
            .then((report) => {
                setReport(report.data.result[0]);
                const arrayBuffer = new Uint8Array(report.data.result[0].pdf_data.data).buffer;
                const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                const pdfDataUrl = `data:application/pdf;base64,${base64String}`;
                setPdfDataUrl(pdfDataUrl);
            });
    };

    useEffect(() => {
        getReport();
    }, [id]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    return (
        <div className='ImageSection'>
            <div>
                Image Name is {report.image}
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
