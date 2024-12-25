import React from 'react'
import  profile  from "../images/logo.png";

function TopSidebar() {
  return (
  <>
     <div className='top'>
          <img className='profile' src={profile} alt="" />
          <span className='username'>BalmBooms@gmail.com</span>
        </div>
        <hr />
  </>
  )
}

export default TopSidebar