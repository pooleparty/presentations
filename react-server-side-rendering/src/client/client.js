import React from 'react';
import { hydrate } from 'react-dom';
import App from '../server/components/app';

const { apps } = window.__STATE__;

delete window.__STATE__;

hydrate(<App apps={apps} />, document.querySelector('#app'));
