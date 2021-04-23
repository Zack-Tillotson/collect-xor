import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import store from './store';
import App from './App';
import sw from './swController'

ReactDOM.render(<App store={store} />, document.getElementById('root'));
sw.register();