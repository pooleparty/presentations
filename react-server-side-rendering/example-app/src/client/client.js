import React from 'react';
import { hydrate } from 'react-dom';
import App from '../server/components/app';

const props = window.__STATE__;

delete window.__STATE__;

const app = <App {...props} />;
const domNode = document.querySelector('#app');

hydrate(app, domNode);
