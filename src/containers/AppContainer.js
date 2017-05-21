import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../layouts/blog';
import info from '../info.json';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

const AppContainer = props => (
  <Layout content={props.children} info={info} />
);

AppContainer.propTypes = propTypes;
AppContainer.defaultProps = defaultProps;

export default AppContainer;
