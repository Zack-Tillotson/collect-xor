import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import store from './store';
import initData from './data'

import App from './App';
import sw from './swController'

initData(store, 'bgshelf') // TODO customize per domain

ReactDOM.render(<App store={store} />, document.getElementById('root'));
sw.register();