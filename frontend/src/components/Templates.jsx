import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/template.css"
import useTemplate from '../hooks/useTemplate';
function Templates() {

  const posts=useTemplate()

  const handleData = () => {
    // setShowImage(!showImage);
    console.log(posts[0])

  };

  return (
    <div>

      <div id="sitemapbyMH">
        <div className='templates'>
        {posts.map((post, index) => (
            <Link to={`/home/templates/${index+1}`} target="_blank" rel="noopener noreferrer">
            <div  key={index} className='content'>
            <h2>{post.title}</h2>
              
            </div>
            </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Templates;
