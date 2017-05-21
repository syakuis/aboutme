import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { markdown } from 'markdown';

const propTypes = {
  params: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  params: {
    content: null,
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

    System.import(`../contents/${props.params.content}.md`).then((module) => {
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
