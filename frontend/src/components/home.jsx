// home.jsx
import React from 'react'
import TopMain from "../screens/TopMain.jsx"
import RightConentMain from '../screens/RightConentMain.jsx'
import Calendar from './Calender.jsx'

function Home() {
  return (

      
      <div className='contentMain'>
        <div className='left'>
          <Calendar/>
        </div>
      </div>
  )
}

export default Home


