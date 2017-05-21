import React from 'react';

const View = props => (
  <div className="blog-post">
    <h2 className="blog-post-title">Another blog post</h2>
    <p className="blog-post-meta">December 23, 2013</p>
    {props.content}
  </div>
);

export default View;
