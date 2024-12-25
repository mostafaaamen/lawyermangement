import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';

// Set the workerSrc to the correct CDN URL
// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
function Reports() {
  // const [pdfFile, setPdfFile] = useState("http://localhost:3001/uploadsLawsuites/1734672504911.pdf");
  // const [pageNumber, setPageNumber] = useState(1);
  return (
    <div>
      {/* <h1>PDF Preview</h1>
      <Document file={pdfFile}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <button onClick={() => setPageNumber(pageNumber + 1)}>
          Next
        </button>
      </div> */}
    </div>
  );
}

export default Reports;
