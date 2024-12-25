import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTemplate from '../hooks/useTemplate';
function TemplateDetail() {
    const posts=useTemplate()
  const { id } = useParams(); // Get the `id` from the URL
  const [post, setPost] = useState(null);




  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} />}
      <p>{post.content}</p>
    </div>
  );
}

export default TemplateDetail;
