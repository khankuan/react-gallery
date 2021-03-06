import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'

import App from './components/App/App'
import PageNotFound from './PageNotFound'

import history from './history'
import { pages } from 'build/config'

window.onload = () => {
  render((
    <Router history={history}>
      <Route path=''>
        {pages ? pages.map((page, i) => React.cloneElement(page, { key: i, component: App, page: page.props.component })) : null}
        <Route path=':category/browse' component={App} />
        <Route path=':category/browse/:mode' component={App} />
        <Route path=':category/:component' component={App} />
        <Route path=':category/:component/:story' component={App} />
        <Route path='*' component={PageNotFound} />
      </Route>
    </Router>
  ), document.getElementById('app'))
}
