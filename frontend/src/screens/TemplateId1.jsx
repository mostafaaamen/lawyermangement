import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useReactToPrint } from "react-to-print";
// import { tempHTMLrender } from "../data/tem.js"; // Assuming this is where your HTML content comes from
import "../style/template.css"; // Assuming this file contains your custom CSS for printing
import useTemplate from '../hooks/useTemplate.jsx';
import HeaderPrint from './HeaderPrint.jsx';

function TemplateId() {
  const { id } = useParams(); // Get the `id` from the URL
  const posts=useTemplate()
    const contentRef = useRef(null);
    // React to Print function
    const reactToPrintFn = useReactToPrint({
      contentRef,
    });
    const handelclick=()=>{
      console.log()
    }
    return (
      <div>
        {/* Content to be printed */}
        <div ref={contentRef} className="template">
          <div className='top'>
            <HeaderPrint/>
          </div>
            <div className='contenteditable'>
            <div className='sidebar' >
            <div className='content' contentEditable={true} style={{  fontFamily: 'Julee',}}>
            sidebar
            </div>
          </div>
          <div
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: posts[id - 1]?.data?.content["$t"] }} // Dynamically set HTML content
          />
        
            </div>
        </div>
  
        {/* Button to trigger print */}
        <button style={{padding:"10px",background:"red",border:"none"}} onClick={reactToPrintFn}>Print Preview</button>
      </div>
    );
  }
export default TemplateId