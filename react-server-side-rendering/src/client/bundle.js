import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../server/redux/configureStore';
import App from '../server/components/app';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app'),
);
