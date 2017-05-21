import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './blog.css';

import info from '../info.json';

const propTypes = {
  content: PropTypes.node,
};

const defaultProps = {
  content: '',
};

const Blog = props => (
  <div>
    <div className="blog-masthead">
      <div className="container">
        <nav className="blog-nav">
          {
            info.menu.map((menu, i) => (
              <Link
                key={`idx_${i}`}
                className="blog-nav-item active"
                to={menu.url}
              >
                {menu.name}
              </Link>
            ))
          }
        </nav>
      </div>
    </div>

    <div className="container">

      <div className="blog-header" />

      <div className="row">

        <div className="col-sm-8 blog-main">

          <div className="blog-post">
            <h2 className="blog-post-title">Another blog post</h2>
            <p className="blog-post-meta">December 23, 2013 by <a href="">Jacob</a></p>

            {props.content}
          </div>

        </div>

        <div className="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div className="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>{info.profile}</p>
          </div>
          <div className="sidebar-module">
            <h4>Archives</h4>
            <ol className="list-unstyled">
              <li><a href="">March 2014</a></li>
              <li><a href="">February 2014</a></li>
              <li><a href="">January 2014</a></li>
              <li><a href="">December 2013</a></li>
              <li><a href="">November 2013</a></li>
              <li><a href="">October 2013</a></li>
              <li><a href="">September 2013</a></li>
              <li><a href="">August 2013</a></li>
              <li><a href="">July 2013</a></li>
              <li><a href="">June 2013</a></li>
              <li><a href="">May 2013</a></li>
              <li><a href="">April 2013</a></li>
            </ol>
          </div>
          <div className="sidebar-module">
            <h4>Elsewhere</h4>
            <ol className="list-unstyled">
              <li><a href="">GitHub</a></li>
              <li><a href="">Twitter</a></li>
              <li><a href="">Facebook</a></li>
            </ol>
          </div>
        </div>

      </div>

    </div>

    <footer className="blog-footer">
      <p>Blog template built for <a href="http://getbootstrap.com">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
      <p>
        <a href="">Back to top</a>
      </p>
    </footer>
  </div>
);

Blog.propTypes = propTypes;
Blog.defaultProps = defaultProps;

export default Blog;
