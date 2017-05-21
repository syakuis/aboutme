import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootswatch/united/bootstrap.css';

import AppContainer from './containers/AppContainer';
import ContentContainer from './containers/ContentContainer';

function parseRedirectQuery(query, replace) {
  const redirectTo = {};

  if (typeof query.pathname === 'string' && query.pathname !== '') {
    redirectTo.pathname = query.pathname;
  }

  if (typeof query.query === 'string' && query.query !== '') {
    const queryObject = {};
    query.query.split('&').map(q => q.split('=')).forEach((arr) => {
      queryObject[arr[0]] = arr.slice(1).join('=');
    });
    redirectTo.query = queryObject;
  }

  if (typeof query.hash === 'string' && query.hash !== '') {
    redirectTo.hash = `#${query.hash}`;
  }

  replace(redirectTo);
}

const gitHubRepoName = 'syakuis';

const domain = 'http://syakuis.github.io';
function redirectToDomain() {
  window.location.replace(domain);
}

function checkForRedirect(nextState, replace) {
  const location = nextState.location;
  if (location.query.redirect === 'true') {
    parseRedirectQuery(location.query, replace);
  } else if (location.pathname.split('/')[1] === gitHubRepoName) {
    redirectToDomain();
  }
}

class App {
  static main() {
    render(
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer} onEnter={checkForRedirect}>
          <IndexRoute component={ContentContainer} />
          <Route path=":content" component={ContentContainer} />
        </Route>
      </Router>
      ,
      document.getElementById('app'),
    );
  }
}

App.main();
