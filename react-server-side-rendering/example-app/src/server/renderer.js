import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/app';

/**
 * Passes given state into top level React component and renders to string
 *
 * @param {Object} initialState Initial application state
 */
module.exports = function render(initialState) {
  const app = <App {...initialState} />;
  return renderToString(app);
};
