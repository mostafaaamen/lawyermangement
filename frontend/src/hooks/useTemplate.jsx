import React, { useState, useEffect, useRef } from 'react';

function useTemplate() {
    const [posts, setPosts] = useState([]);
    const labels = useRef([]); 
    useEffect(() => {
      const script = document.createElement('script');
      script.src =
        'https://azmoslaw.blogspot.com/feeds/posts/default/?start-index=1&max-results=150&orderby=published&alt=json-in-script&callback=GetLabels';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []); 
    window.GetLabels = (e) => {
      const newLabels = [];
      e.feed.category.forEach((category) => {
        newLabels.push(category.term);
      });
      labels.current = newLabels; 
    //   const grotitle = document.createElement('h1');
    //   grotitle.style.textAlign = 'center';
    //   grotitle.textContent = 'فهرس المدونة';
    //   document.getElementById('sitemapbyMH').appendChild(grotitle);
  
      // Create category elements dynamically
      e.feed.category.forEach((category, index) => {
        const titlemh = document.createElement('h2');
        titlemh.className = 'h2style';
        titlemh.innerHTML = category.term;
  
        // const listul = document.createElement('ul');
        // listul.className = 'MH' + index;
  
        // document.getElementById('sitemapbyMH').appendChild(titlemh);
        // document.getElementById('sitemapbyMH').appendChild(listul);
      });
    //   Load posts after labels
      const script2 = document.createElement('script');
      script2.src =
        'https://azmoslaw.blogspot.com/feeds/posts/default/?start-index=1&max-results=150&orderby=published&alt=json-in-script&callback=GetSitemap';
    //   document?.getElementById('sitemapbyMH').appendChild(script2);
      document.body.appendChild(script2);
    };
    // Set the posts
    window.GetSitemap = (e) => {
      const newPosts = [];
      e?.feed?.entry?.forEach((entry) => {
        entry?.category?.forEach((category) => {
          const labelIndex = labels.current.indexOf(category.term);
          const postOrder = entry.link.length - 1;
  
          const post = {
            title: entry.link[postOrder].title,
            url: entry.link[postOrder].href,
            data:entry,
            };
  
          newPosts.push(post);
        });
      });
  
      setPosts(newPosts);
    };
    return posts;  

}

export default useTemplate