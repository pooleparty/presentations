import React from 'react';
import { render } from 'react-dom';
import App from '../server/components/app';

const app = <App />;
const domNode = document.querySelector('#app');

render(app, domNode);
