// layout.jsx
import React from 'react'
import Sidebar from './sidebar'
import Main from './main'
import "../styles/index.css"
import TopMain from "../screens/TopMain.jsx"
function Layout() {
  return (
    <div className='page'>
    <div className='mainApp'>
      <div className='main'>
        
    <TopMain/>
      </div>
    <Main/>
    </div>
    <Sidebar/>
    </div>
  )
}

export default Layout


