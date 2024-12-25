import React from 'react'
import "../styles/topMain.css"
import logo from "../images/logo_remove.png"
function TopMain() {
  return (
    <div className='top'>
    <img src={logo} alt="" />
    <h4 className="appName">Law Frim</h4>
   </div>
  )
}

export default TopMain