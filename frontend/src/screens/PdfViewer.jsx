
import React from 'react';

const PDFViewer = ({urlPdf}) => {
 return (
 <div>
  {/* <iframe src=”path_to_pdf_file.pdf” width=”100%” height=”500px” /> */}
  <iframe src={urlPdf} style={{width:"100%",height:"100vh"}}  frameborder="0"></iframe>
 </div>
 );
};
export default PDFViewer;




// // PdfPreview.js
// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function PdfPreview({pdfURl}) {
//   const [pdfFile, setPdfFile] = useState(pdfURl); // Directly using the file in public folder
//   const [pageNumber, setPageNumber] = useState(1);

//   return (
//     <div>
//       <h1>PDF Preview</h1>
//       <Document file={pdfFile}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div>
//         <button
//           disabled={pageNumber <= 1}
//           onClick={() => setPageNumber(pageNumber - 1)}
//         >
//           Previous
//         </button>
//         <button onClick={() => setPageNumber(pageNumber + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PdfPreview;
