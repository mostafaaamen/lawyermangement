import React, { useState } from "react";
import "./mainPopup.css"
function MainPopup({ isOpen, close,width ,children}) {
    if (!isOpen) return null;  // Don't render the modal if it isn't open
    
    return (
      <div className="modal-overlay">
        <div className="modal" style={{width: width}}>
          <button className="close" onClick={close}><i class="fa-solid fa-square-xmark"></i></button>
          {children}
        </div>
      </div>
    );
  }

export default MainPopup;