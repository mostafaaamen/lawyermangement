import React from 'react'

function RightConentMain({title,data,icon,bgstart,bgend}) {
  return (
        <div className='parentContent' style={{backgroundImage:` linear-gradient(to right, ${bgstart} , ${bgend})`}}>
            <div className='content'>
                <span>{title}</span>
                <span>{data}</span>
            </div>
            <i className={icon}></i>
        </div>
)
}

export default RightConentMain