import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { markdown } from 'markdown';

const propTypes = {
  params: PropTypes.shape({
    content: PropTypes.string,
  }),
};

const defaultProps = {
  params: {
    content: 'aboutme',
  },
};

class ContentContainer extends Component {
  static html(content) {
    return { __html: markdown.toHTML(content) };
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.setContent(props.params.content || 'aboutme');
  }

  componentWillReceiveProps(nextProps) {
    this.setContent(nextProps.params.content || 'aboutme');
  }

  setContent(content) {
    System.import(`../contents/${content}.md`).then((module) => {
      axios.get(module).then((res) => {
        this.setState({
          loading: false,
          content: res.data,
        });
      });
    });
  }

  render() {
    if (this.state.loading) return null;
    return (
      <div>
        <span dangerouslySetInnerHTML={ContentContainer.html(this.state.content)} />
      </div>
    );
  }
}

ContentContainer.propTypes = propTypes;
ContentContainer.defaultProps = defaultProps;

export default ContentContainer;
