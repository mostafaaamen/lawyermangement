import React from 'react'
import img from "../images/logo_remove.png"
function HeaderPrint() {
  return (
    <div className='HeaderPrint'>
      {/* <img src="" alt="" srcset="" /> */}
      <div className='content'>
        <div>
          <h4>AZMOS SEO</h4>
          <h4>GROUP</h4>
          <h4>FOR LAWSUITE</h4>
        </div>
        <div>
          <img width={"120px"} height={"120px"} src={img} alt="img for header" srcset="" />
        </div>
        <div dir='rtl'>
        <h4> شركة ازموس </h4>
          <h4> للاستشارات القانونية</h4>
          <h4>  والمحاماه </h4>
        </div>
      </div>
    </div>
  )
}

export default HeaderPrint