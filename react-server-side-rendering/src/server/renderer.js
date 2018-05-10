import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';

module.exports = function render(initialState) {
  // Model the initial state
  const store = configureStore(initialState);
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  const content = renderToString(app);

  const preloadedState = store.getState();

  return { content, preloadedState };
};
