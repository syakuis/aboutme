import React from 'react';
import PropTypes from 'prop-types';

import Blog from '../layouts/Blog';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

const AppContainer = props => (
  <Blog content={props.children} />
);

AppContainer.propTypes = propTypes;
AppContainer.defaultProps = defaultProps;

export default AppContainer;
